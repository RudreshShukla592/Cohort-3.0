import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCartController = async (req, res) => {
  const { productId, quantity, size } = req.body;

  const product = await productModel.findById(productId);
  if (!product) {
    res.status(404).json({
      message: "Product not found",
    });
  }

  const sizeChecker = product.sizes.find((s) => s.size === size);
  if (!sizeChecker) {
    res.status(400).json({
      message: "Invalid Size",
    });
  }

  if (sizeChecker.stock < quantity) {
    res.status(400).json({
      message: "Insufficient Stock",
    });
  }

  //  ?? :- it returns right-hand-side operand when it's left-hand-side operand is null/undefined
  const cart =
    (await cartModel.findOne({ user: req.user._id })) ??
    (await cartModel.create({ user: req.user._id }));

  const productInCart = cart.products.find(
    // Why .toString()? ---> MongoDB's ObjectId isn't a normal JavaScript string but productId is.
    (p) => p.product.toString() === productId && p.size === size,
  );

  if (productInCart) {
    if (productInCart.quantity + quantity > sizeChecker.stock) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    await cartModel.updateOne(
      {
        user: req.user._id,
        "products.product": productId,
        "products.size": size,
      },
      {
        $inc: {
          "products.$.quantity": quantity,
        },
      },
    );

    return res.status(200).json({
      message: "Product quantity updated in cart",
    });
  }

  await cartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      $push: {
        products: {
          product: productId,
          quantity,
          size,
        },
      },
    },
  );

  return res.status(200).json({
    message: "Product added to cart!",
  });
};

export const getAllCartController = async (req, res) => {
  const cart =
    (await cartModel.findOne({ user: req.user._id })) ??
    (await cartModel.create({ user: req.user._id }));

  return res.status(200).json({
    message: "Cart retrieved successfully",
    data: {
      cart,
    },
  });
};

