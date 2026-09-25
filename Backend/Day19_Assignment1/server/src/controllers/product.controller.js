import productModel from "../models/product.model.js";

export const createProductController = async (req, res) => {
  try {
    const { title, description, price, stock } = req.body;

    const product = await productModel.create({
      createdBy: req.user._id,
      title,
      description,
      price,
      stock,
    });

    res.status(201).json({
      message: "Product Created!!!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
    console.log(`The error is ${error}`);
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const allProducts = await productModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await productModel.countDocuments();

    res.status(200).json({
      message: "Products fetched",
      data: allProducts,
      pagination: {
        currentPage: page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(`The error is ${error}`);
  }
};

export const getMyProductsController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const filter = { createdBy: req.user._id };

    const myProducts = await productModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await productModel.countDocuments(filter);

    res.status(200).json({
      message: "Your products fetched",
      data: myProducts,
      pagination: {
        currentPage: page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(`The error is ${error}`);
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product fetched", data: product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(`The error is ${error}`);
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, stock } = req.body;

    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      { title, description, price, stock },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product Updated!", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(`The error is ${error}`);
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findOneAndDelete({
      _id: id,
      createdBy: req.user._id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(`The error is ${error}`);
  }
};
