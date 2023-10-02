import User from "../models/usersModel";
import { uploadToCloud } from "../helper/cloud";
import Jwt from "jsonwebtoken";
import bcrypt, { genSalt, hash } from "bcrypt";
export const createUser = async (req, res) => {
  let { fullName, email, userProfile, gender, password, role } = req.body;

  try {
    const userEmail = await User.findOne({
      email: req.body.email,
    });
    if (userEmail) {
      return res.status(500).json({
        message: "Email Already Exist",
      });
    }

    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullName,
      email,
      userProfile:
        result?.secure_url ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      gender,
      password: hashedPass,
      role,
    });

    return res.status(201).json({
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed To creating user",
      error: error.message,
    });
  }
};

// Get All Users

export const getUsers = async (req, res) => {
  try {
    const getAll = await User.find();
    return res.status(200).json({
      message: "All users Data Revieved",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed To retrieve All Data",
      error: error.message,
    });
  }
};

// delte Single users

export const delUser = async (req, res) => {
  const { id } = req.params;
  try {
    const getId = await User.findById(id);
    if (!getId) {
      return res.status(404).json({ message: "User Id Not Found" });
    }

    await User.findByIdAndDelete(id);
    return res.status(201).json({
      message: "Data Deleted Well!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to Delete User",
      error: error.message,
    });
  }
};

// Update user
export const upuser = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, userProfile, gender, password, role } = req.body;
  try {
    const getId = await User.findById(id);
    if (!getId) {
      return res.status(404).json({ message: "User Id Not Found" });
    }
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const updated = await User.findByIdAndUpdate(id, {
      fullName,
      email,
      userProfile:
        result?.secure_url ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      gender,
      password: hashedPass,
      role,
    });

    return res.status(201).json({
      message: "Data Updated  Well!!",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't Update User",
      error: error.message,
    });
  }
};

// UserLogin

export const login = async (req, res) => {
  try {
    const userLogin = await User.findOne({
      email: req.body.email,
    });
    if (!userLogin) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, userLogin.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Password inorect",
      });
    }
    const token = await Jwt.sign(
      { id: userLogin._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE_DATE }
    );
    res.status(200).json({
      message: "logedin success",
      users: userLogin,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail to retrive data",
      error: error.message,
    });
  }
};
