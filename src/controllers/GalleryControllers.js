import Gallery from "../models/GalleryModels";
import { uploadToCloud } from "../helper/cloud";

export const createAlbum = async (req, res) => {
  try {
    const { galleryImage } = req.body;

    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
    const album = await Gallery.create({
      galleryImage:
        result?.secure_url ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    });
    return res.status(201).json({
      message: "Album Created Successfully",
      data: album,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't Create Image",
    });
  }
};

// userLogin

export const login = async (req, res) => {
  try {
    const userLogin = await users.findOne({
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


// Read All Album

export const getAlbum = async (req, res) => {
  try {
    const getAlbum = await Gallery.find();
    return res.status(200).json({
      message: "All Fetched Well",
      data: getAlbum,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't Retrieve Album",
      error: error.message,
    });
  }
};
// Read Single Album

export const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const getAlbum = await Gallery.findById(id);
    return res.status(200).json({
      message: "Single Fetched Well",
      data: getAlbum,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't Retrieve Single Image",
      error: error.message,
    });
  }
};

// delete

export const delGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const getAlbum = await Gallery.findById(id);
    if (!getAlbum) {
      return res.status(404).json({
        message: "Id Not Found",
      });
    }

    await Gallery.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Image Deleted Well",
      data: getAlbum,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't Delete Image",
      error: error.message,
    });
  }
};
// Update

export const UpGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const getAlbum = await Gallery.findById(id);
    if (!getAlbum) {
      return res.status(404).json({
        message: "Id Not Found",
      });
    }

    await Gallery.findByIdAndUpdate(id);
    return res.status(200).json({
      message: "Image Updated Well",
      data: getAlbum,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't Update Image",
      error: error.message,
    });
  }
};
