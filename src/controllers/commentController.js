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
// getComment
export const getComment = async (req, res) => {
  try {
    const findComment = await comment
      .find()
      .populate("author", "fullName userProfile");
    return res.status(200).json({
      status: "200",
      message: "Comment Retrived",
      data: findComment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Retrieve Comment",
      error: error.message,
    });
  }
};
export const getOneComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentId = await comment
      .findById(id)
      .populate("author", "fullName userProfile");
    if (!commentId) {
      return res.status(404).json({
        status: "404",
        message: "Comment Id Not Found",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Comment Retrived",
      data: commentId,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Retrieve Comment",
      error: error.message,
    });
  }
};
// delete
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentId = await comment.findById(id);
    if (!commentId) {
      return res.status(404).json({
        status: "404",
        message: "Comment Id Not Found",
      });
    }
    await comment.findByIdAndDelete(commentId);
    return res.status(200).json({
      status: "200",
      message: "Comment Deleted Well",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Delete Comment",
      error: error.message,
    });
  }
};
// update Comment
export const updateComment = async (req, res) => {
  try {
    const { postComment } = req.body;
    const { id } = req.params;
    const { User } = req;
    const coId = await comment.findById(id);
    if (!coId) {
      return res.status(404).json({
        status: "404",
        message: "comment id Not Found",
      });
    }
    await comment.findByIdAndUpdate(coId, {
      postComment,
      author: User._id,
    });
    return res.status(200).json({
      status: "200",
      message: "Comment Updated Well",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Update Comment",
      error: error.message,
    });
  }
};
