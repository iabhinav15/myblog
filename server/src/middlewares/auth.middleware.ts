import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../types/global";
import { UserDocument } from "../types/global";


declare global {
    namespace Express {
      interface Request {
        user: UserDocument;
      }
    }
}

// Verify JWT
export const verifyJWT = asyncHandler(async(req:Request, _:Response, next:NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as TokenPayload
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error: any) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})