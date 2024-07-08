import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    owner :{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: ''
    },
    // for array no need to use default value
    tags: [{
        type: String,
    }],
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    readingDuration: {
        type: String,
        default: ''
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    isActive: {
        type: Boolean,
        default: true
    }
  },{ timestamps: true });


export const Post = mongoose.model("Post", postSchema)