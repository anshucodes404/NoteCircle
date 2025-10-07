import { Router } from "express";
import verifyJWT from "../middlewares/jwt.middleware.ts";
import {
  login,
  registerUser,
  searchUsers,
  userInfo,
} from "../controllers/user.controller.ts";

const userRouter = Router()

// userRouter.use(verifyJWT)

userRouter.route("/signup").post(registerUser)
userRouter.route("/login").post(login)
userRouter.route("/search").get(verifyJWT, searchUsers)
userRouter.route("/userInfo").get(verifyJWT, userInfo)


export default userRouter