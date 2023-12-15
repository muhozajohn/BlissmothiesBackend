import blog from "../models/BlogModels";
import { uploadToCloud } from "../helper/cloud";

// create Blog

export const createPost = async (req, res) => {
  try {
    const { author, image, title, category, ingridents, content, comments } =
      req.body;
    if (
      author === "" ||
      image === "" ||
      title === "" ||
      category === "" ||
      ingridents === "" ||
      content === ""
    ) {
      return res.status(500).json({
        status: "500",
        message: "Field Required",
      });
    }
    const userTitle = await blog.findOne({
      title: req.body.title,
    });
    if (userTitle) {
      return res.status(500).json({
        message: "Title Already Exist",
      });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const makeBog = await blog.create({
      author: req.User._id,
      image: result?.secure_url,
      title,
      category,
      ingridents,
      content,
      comments,
    });
    return res.status(201).json({
      status: "201",
      message: "Created Well",
      data: makeBog,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Create Blog",
      error: error.message,
    });
  }
};

// get All Blog
export const getBlog = async (req, res) => {
  try {
    const Allblog = await blog
      .find()
      .populate({
        path: "comments",
        populate: { path: "author", select: "fullName userProfile" },
      })
      .populate({
        path: "author",
        select: "fullName userProfile",
      });
    return res.status(200).json({
      status: "200",
      message: "Success To get All",
      blog: Allblog,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Read Blog",
      error: error.message,
    });
  }
};
// getOne blog
export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const finDId = await blog
      .findById(id)
      .populate({
        path: "comments",
        populate: { path: "author", select: "fullName userProfile" },
      })
      .populate({
        path: "author",
        select: "fullName userProfile",
      });
    if (!finDId) {
      return res.status(404).json({
        status: "404",
        message: "Post Not Found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Post Retrieved Succefully",
      data: finDId,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Read Blog",
      error: error.message,
    });
  }
};

// delete
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const finDId = await blog.findById(id);
    if (!finDId) {
      return res.status(404).json({
        status: "404",
        message: "Post Not Found",
      });
    }
    await blog.findByIdAndDelete(id);
    return res.status(200).json({
      status: "200",
      message: "Post Deleted Succefully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Delete Blog",
      error: error.message,
    });
  }
};

// update Blog
export const updatePost = async (req, res) => {
  try {
    const { title, category, ingridents, content, comments } = req.body;
    const { User } = req;
    const { id } = req.params;
    const finDId = await blog.findById(id);
    if (!finDId) {
      return res.status(404).json({
        status: "404",
        message: "Post Not Found",
      });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const makeBog = await blog.findByIdAndUpdate(finDId, {
      author: User._id,
      image: result?.secure_url || finDId.image,
      title,
      category,
      ingridents,
      content,
      comments,
    });
    return res.status(201).json({
      status: "201",
      message: "Updated Well",
      data: makeBog,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Update Blog",
      error: error.message,
    });
  }
};
