import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ********** SIGNUP USER ***********
export const Signup = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(201).json(others);
  } catch (error) {
    if (error.code && error.code === 11000) {
      return res.status(400).json("Sorry, email already in use!");
    }
    res.status(500).json("Sorry, something went wrong!");
  }
};

// *********** LOGIN USER **********
export const Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const isValidPwd = await bcrypt.compare(req.body.password, user.password);

    if (!user || !isValidPwd) {
      return res.status(400).json("Invalid Credentials!");
    }
    const { password, ...others } = user._doc;
    const token = jwt.sign(
      {
        userID: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "1d" }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    res.status(500).json("Invalid Credentials");
  }
};
