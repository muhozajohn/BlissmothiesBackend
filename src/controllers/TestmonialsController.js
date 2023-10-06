import Testimoniols from "../models/TestmonialsModels";
import { uploadToCloud } from "../helper/cloud";

// Leave Your Comment peacefull

export const createTestmoniols = async (req, res) => {
  const { profile, name, comment } = req.body;
  try {
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const MakeIt = await Testimoniols.create({
      profile: req.User.userProfile,
      name: req.User.fullName,
      comment,
    });

    return res.status(201).json({
      message: "Congratration You Made It",
      data: MakeIt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed Try Again",
      error: error.message,
    });
  }
};
//update and Leave Your Comment peacefull

export const uptest = async (req, res) => {
  const { profile, name, title, comment } = req.body;
  try {
    const { id } = req.params;
    const MadeIt = await Testimoniols.findById(id);
    if (!MadeIt)
      return res.status(404).json({ message: "Testmoniols Id Not Found" });

    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const MakeIt = await Testimoniols.findByIdAndUpdate(id,{
      profile:
        result?.secure_url ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      name: req.User.fullName,
      title,
      comment,
    });

    return res.status(201).json({
      message: "Congratration You Made It",
      data: MakeIt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed Try Again",
      error: error.message,
    });
  }
};

// Get All TestMoniols
export const getAllTestmoniols = async (req, res) => {
  try {
    const MakeIt = await Testimoniols.find();
    return res.status(201).json({
      message: "Congratration You Made It",
      data: MakeIt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed Try Again",
      error: error.message,
    });
  }
};
// Get Single TestMoniols
export const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const MakeIt = await Testimoniols.findById(id);
    if (!MakeIt)
      return res.status(404).json({ message: "Testmoniols Not Found" });
    return res.status(201).json({
      message: "Congratration You Made It",
      data: MakeIt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed Try Again",
      error: error.message,
    });
  }
};

// delte Testmoniols

export const delTest = async (req, res) => {
  try {
    const { id } = req.params;
    const MakeIt = await Testimoniols.findById(id);
    if (!MakeIt)
      return res.status(404).json({ message: "Testmoniols Not Found" });
    await Testimoniols.findByIdAndDelete(id);
    return res.status(201).json({
      message: "Congratration You Deleted It",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed Try Again",
      error: error.message,
    });
  }
};
