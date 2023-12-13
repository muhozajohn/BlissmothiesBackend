import event from "../models/eventModels";
import { uploadToCloud } from "../helper/cloud";

// creating event

export const makeevent = async (req, res) => {
  try {
    const { title, content, price } = req.body;

    const existingTitle = await event.findOne({
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
    const makeevent = await event.create({
      title,
      image:
        result?.secure_url ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      content,
      price,
    });

    return res.status(200).json({
      status: "200",
      message: "event Created Well",
      data: makeevent,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create event",
      error: error.message,
    });
  }
};

// GetAll

export const getAllevent = async (req, res) => {
  try {
    const getAll = await event.find();
    return res.status(200).json({
      status: "200",
      message: "Retrieved Successfully",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Display event",
      error: error.message,
    });
  }
};
// GetAll One

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const getId = await event.findById(id);
    if (!getId) {
      return res.status(404).json({
        status: "404",
        message: "event Id Not Found",
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
      message: "Failed To Display event",
      error: error.message,
    });
  }
};
// delete

export const removeevent = async (req, res) => {
  try {
    const { id } = req.params;
    const getId = await event.findById(id);
    if (!getId) {
      return res.status(404).json({
        status: "404",
        message: "event Id Not Found",
      });
    }
    await event.findByIdAndDelete(id);
    return res.status(200).json({
      status: "200",
      message: "Retrieved Successfully",
      data: getId,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Delete event",
      error: error.message,
    });
  }
};

// update
export const updateevent = async (req, res) => {
  try {
    const { title, content, price } = req.body;
    const { id } = req.params;
    const getId = await event.findById(id);
    if (!getId) {
      return res.status(404).json({
        status: "404",
        message: "event Id Not Found",
      });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    await event.findByIdAndUpdate(id, {
      title,
      image: result?.secure_url || getId.image,
      content,
      price,
    });

    return res.status(200).json({
      status: "200",
      message: "event Updated Well",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Create event",
      error: error.message,
    });
  }
};
