import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  postComment: {
    type: String,
    require: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blog",
    require: true,
  },
});

const comment = mongoose.model("comment", commentSchema);
export default comment;
