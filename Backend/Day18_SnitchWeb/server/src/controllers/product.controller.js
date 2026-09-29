import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  const { title, description } = req.body;
  const filesUrls = [];

  // to upload all files(img) on ImageKit and save it's URL
  for (let i = 0; i < req.files.length; i++) {
    const res = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalName,
    });

    filesUrls.push(res.url);
  }

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
};

export const getAllProductsControllers = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All products fetched",
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
