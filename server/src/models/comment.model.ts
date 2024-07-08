import mongoose, {Schema} from "mongoose";


const commentSchema = new Schema({
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        },
    },
    {
        timestamps: true
    }
)


export const Comment = mongoose.model("Comment", commentSchema)