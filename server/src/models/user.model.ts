import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";   
import { UserDocument } from "../types/global";


const userSchema = new Schema<UserDocument>({
    userName:{
        type: String,
        default: '',
        unique: true
    },
    fullName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    posts: [{
        type: Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    likedPosts: [{
        type: Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    savedPosts: [{
        type: Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    interests: [{
        type: String
    }],
    coverPicture: {
        type: String,
        default: ''
    },
    profilePicture: {
        type: String,
        default: ''
    },
    shortBio: {
        type: String,
        default: ''
    },
    aboutAuthor: {
        type: String,
        default: ''
    },
    history: [{
        type: Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    website: {
        type: String,
        default: ''
    },
    pronounce: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    followers: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    savedDrafts: [{
        type: Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    
}, {timestamps: true});


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function(password: string){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model('User', userSchema);

