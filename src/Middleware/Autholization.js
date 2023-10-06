import jwt from "jsonwebtoken";
import User from "../models/usersModel";

const Authorization = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        status: "Failed",
        message: "You are not logged in please login",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const logedUser = await User.findById(decoded.id);

    if (!logedUser) {
      res.status(403).json({
        status: "Failed",
        message: "Token has Expired Please login Again",
      });
    }

    if (logedUser.role !== "user") {
      res.status(404).json({
        status: "Failed",
        message: "Only Loged User can do this operation",
      });
    } else {
      req.User = logedUser;
      next();
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

export default Authorization;
