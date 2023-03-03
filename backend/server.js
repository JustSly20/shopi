import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8800;

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("CONNECTED TO THE DB");
  })
  .catch((err) => console.log(err));
app.listen(PORT, console.log(`server is running on port ${PORT}`));
