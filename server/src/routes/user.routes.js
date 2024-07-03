import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";



const router = Router();

router.route("/register").post(registerUser)
router.route("/login").get(loginUser);

export default router;