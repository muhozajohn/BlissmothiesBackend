import menu from "../models/MenuModels";
import { uploadToCloud } from "../helper/cloud";

// creating menu

export const makemenu = async (req, res) => {
  try {
    const { title, image, content, price, category } = req.body;

    const existingTitle = await menu.findOne({
      title: req.body.title,
    });
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const makeMenu = await menu.create({
      title,
      image:
        result?.secure_url ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      content,
      price,
      category,
      owner: req.User.fullName,
    });

    return res.status(200).json({
      status: "200",
      message: "Menu Created Well",
      data: makeMenu,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create Menu",
      error: error.message,
    });
  }
};

// GetAll

export const getAllmenu = async (req, res) => {
  try {
    const getAll = await menu.find();
    return res.status(200).json({
      status: "200",
      message: "Retrieved Successfully",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Display Menu",
      error: error.message,
    });
  }
};
// GetAll One

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const getId = await menu.findById(id);
    if (!getId) {
      return res.status(404).json({
        status: "404",
        message: "Menu Id Not Found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Retrieved Successfully",
      data: getId,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Display Menu",
      error: error.message,
    });
  }
};
// delete

export const removeMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const getId = await menu.findById(id);
    if (!getId) {
      return res.status(404).json({
        status: "404",
        message: "Menu Id Not Found",
      });
    }
    await menu.findByIdAndDelete(id);
    return res.status(200).json({
      status: "200",
      message: "Deleted Successfully",
      data: getId,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Delete Menu",
      error: error.message,
    });
  }
};

// update
export const updateMenu = async (req, res) => {
  try {
    const { title, image, content, price, category } = req.body;
    const { id } = req.params;
    const getId = await menu.findById(id);
    if (!getId) {
      return res.status(404).json({
        status: "404",
        message: "Menu Id Not Found",
      });
    }
    const existingTitle = await menu.findOne({
      title: req.body.title,
    });

    if (existingTitle) {
      return res.status(403).json({
        status: "403",
        message: "Title Already Exist Try Again",
      });
    }

    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    await menu.findByIdAndUpdate(id, {
      title,
      image:
        result?.secure_url ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      content,
      price,
      category,
    });

    return res.status(201).json({
      status: "201",
      message: "Menu Updated Well",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create Menu",
      error: error.message,
    });
  }
};
