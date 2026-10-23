import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description } = req.body;

    const filesUrls = await Promise.all(
      req.files.map((file) =>
        uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        }),
      ),
    );

    const product = await productModel.create({
      title,
      description,
      price: {
        amount: req.body.price.amount,
        currency: req.body.price.currency,
      },
      sizes: req.body.sizes,
      images: filesUrls,
      seller: req.user._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Server Error",
    });
  }
};
