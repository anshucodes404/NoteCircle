import { Router } from "express";
import verifyJWT from "../middlewares/jwt.middleware.ts";
import { login, registerUser } from "../controllers/user.controller.ts";

const userRouter = Router()

// userRouter.use(verifyJWT)

userRouter.route("/signup").post(registerUser)
userRouter.route("/login").post(login)


export default userRouter