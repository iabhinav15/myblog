import { User } from "../models/user.model";
import mongoose from "mongoose";

export interface TokenPayload {
  _id: string;
}

export interface UserDocument extends mongoose.Document{
  userName: string;
  fullName: string;
  email: string;
  password: string;
  isActive: boolean;
  posts: string[];
  likedPosts: string[];
  comments: string[];
  savedPosts: string[];
  interests: string[];
  coverPicture: string;
  profilePicture: string;
  shortBio: string;
  aboutAuthor: string;
  history: string[];
  website: string;
  pronounce: string;
  location: string;
  followers: string[];
  following: string[];
  savedDrafts: string[];
  createdAt: Date;
  updatedAt: Date;
  resetPasswordToken: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  compareRefreshToken(refreshToken: string): boolean;
  removeRefreshToken(): void;
  refreshToken: string;
}