import comment from "../models/commentModels";
import blog from "../models/BlogModels";
// createComment

export const makeComment = async (req, res) => {
  try {
    const { postComment } = req.body;
    const { id } = req.params;
    const findBId = await blog.findById(id);
    if (!findBId) {
      return res.status(404).json({
        status: "404",
        message: "Blog id Not Found",
      });
    }
    const newComment = await comment.create({
      postComment,
      author: req.User._id,
    });
    await blog.findByIdAndUpdate(
      { _id: id },
      { $push: { comments: newComment._id } }
    );

    return res.status(200).json({
      status: "200",
      message: "Comment Added",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to add Comment",
      error: error.message,
    });
  }
};
