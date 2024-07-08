import { User } from "../models/user.model"
import {Post} from '../models/post.model'
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { asyncHandler } from "../utils/asyncHandler"
import {Request, Response, NextFunction} from 'express'
import { TokenPayload, UserDocument } from "../types/global"
import jwt from "jsonwebtoken"


// create a new post
export const createPost = asyncHandler( async (req:Request, res:Response, next:NextFunction) => {
    const { title, content } = req.body

    if (
        [title, content].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const post = await Post.create({
        title, 
        content,
  })

  const createdPost = await Post.findById(post._id).select(
      "-content"
  )
})