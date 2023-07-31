import User from "../models/usersModel";
import { uploadToCloud } from "../helper/cloud";
import bcrypt, { genSalt, hash } from "bcrypt";
export const createUser = async (req, res) => {
  let { firstName, lastName, email, username, userProfile, password, role } =
    req.body;
  try {
    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      userProfile:
        result?.secure_url ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
