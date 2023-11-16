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
      return res.status(401).json({
        status: "Failed",
        message: "You are not logged in, please login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await User.findById(decoded.id);

    if (!loggedInUser) {
      return res.status(403).json({
        status: "Failed",
        message: "Token has expired, please login again",
      });
    }

    req.User = loggedInUser;

    if (loggedInUser.role === "admin") {
      // Admin has access to all routes
      next();
    } else if (loggedInUser.role === "user") {
      // Regular user has limited access
      if (req.originalUrl.startsWith("/Dashboard")) {
        return res.status(403).json({
          status: "Failed",
          message: "Only admin can access this route",
        });
      }
      next();
    } else {
      // Handle other roles if needed
      return res.status(403).json({
        status: "Failed",
        message: "Unauthorized role",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

export default Authorization;
