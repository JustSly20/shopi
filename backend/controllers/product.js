import Product from "../models/product.js";

export const CreateProduct = async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body });
    const product = newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const GetProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const GetSingleProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.productId);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// export const DeleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.body.productId);
//     res.status(200).json();
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
