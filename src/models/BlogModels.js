import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    ingridents: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
        require: false,
      },
    ],
  },

  { timestamps: true }
);

const blog = mongoose.model("blogs", blogSchema);
export default blog;
