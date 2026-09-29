import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  const { title, description } = req.body;

  /**  const filesUrls = [];

  // to upload all files(img) on ImageKit and save it's URL
  for (let i = 0; i < req.files.length; i++) {
    const res = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalname,
    });

    filesUrls.push(res.url);
  }
*/

  // MENTOS ZINDAGI!!
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
};

export const getAllProductsControllers = async (req, res) => {
  try {
    const products = await productModel
      .find({ published: true })
      .sort({ createdAt: -1 });

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

export const getAllProductsForSellerController = async (req, res) => {
  const products = await productModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    message: "All products fetched",
    data: {
      products,
    },
  });
};

export const unListProductController = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product don't exist",
    });
  }

  await productModel.findByIdAndUpdate(id, { published: false });

  return res.status(200).json({
    message: "Product unpublished successfully",
  });
};

export const listProductController = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product don't exist",
    });
  }

  await productModel.findByIdAndUpdate(id, { published: true });

  return res.status(200).json({
    message: "Product published successfully",
  });
};
