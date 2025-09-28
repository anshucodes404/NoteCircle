import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

export default async function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
        console.error("Unauthorized access: No token provided");
        return res.status(401).json({message: "Unauthorized access"})
    }

    try {
        const decodedToken: jwt.JwtPayload = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET as Secret
        ) as jwt.JwtPayload;

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if (!user) {
            console.error("User not found");
            return res.status(404).json({message: "User not found"})
        }

        req.user = user;
        next()

    } catch (error) {
        
    }
}