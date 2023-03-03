import express from "express";
import { Signup, Login } from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Login);

export default router;
