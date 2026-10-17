import express from "express";
import productModel from "../models/product.model.js";
import razorpay from "../config/razorpay.js";
import paymentModel from "../models/payment.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";

const router = express.Router();

router.post("/:productId/order", async (req, res) => {
  const { productId } = req.params;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found.",
    });
  }

  const order = await razorpay.orders.create({
    amount: product.price.amount * 100,
    currency: product.price.currency,
    receipt: `rcpt_${Date.now()}`,
    notes: { productId: String(product._id) },
  });

  const payment = await paymentModel.create({
    orderId: order.id,
    productId: productId,
    amount: product.price.amount,
    currency: product.price.currency,
    status: "pending",
  });

  res.status(201).json({
    message: "Order fetched to Razorpay",
    payment,
  });
});

router.post("/:orderId/verify", async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  const payment = await paymentModel.findById({
    orderId,
    status: "pending",
  });

  if (!payment) {
    return res.status(404).json({
      message: "Payment not found or already verified",
    });
  }

  const isValid = validatePaymentVerification(
    {
      order_id: orderId,
      payment_id: paymentId,
    },
    signature,
    config.RAZORPAY_KEY_SECRET,
  );

  if (!isValid) {
    return res.status(400).json({ message: "Invalid payment verification" });
  }

  await paymentModel.updateOne(
    { orderId },
    { $set: { status: "completed", paymentId, signature } },
  );

  res.status(200).json({ message: "payment verified successfully" });
});

export default router;
