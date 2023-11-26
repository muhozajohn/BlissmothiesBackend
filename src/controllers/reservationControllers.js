import path from "path";
import request from "../models/reservationModels";
// create

export const makeRequest = async (req, res) => {
  try {
    const { DateArrival, DateDeparture, peaple, requestOwner, time, tel } =
      req.body;
    const make = await request.create({
      DateArrival,
      DateDeparture,
      peaple,
      time,
      tel,
      requestOwner: req.User._id,
    });
    return res.status(201).json({
      status: "201",
      message: "Request Sent",
      data: make,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to make Request",
    });
  }
};
export const RemoveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const delId = await request.findById(id);
    if (!delId) {
      return res.status(404).json({
        status: "404",
        message: " Request ID Not Fournd",
      });
    }
    await request.findByIdAndDelete(id);
    return res.status(200).json({
      status: "200",
      message: " Job Well Done",
      data: delId,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to make Request",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const findAll = await request.find().populate({
      path: "requestOwner",
      select: "fullName email gender",
    });
    return res.status(200).json({
      status: "200",
      message: "All Fetched",
      data: findAll,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to get All Request",
    });
  }
};
