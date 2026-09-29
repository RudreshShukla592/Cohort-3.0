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

  const isProductInCart = cart.products.find((p)=> p.product.toString() === productId)

  if(isProductInCart){
    
  }
};
