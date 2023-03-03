import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  category: {
    type: String,
    require: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
