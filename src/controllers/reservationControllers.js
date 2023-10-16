import request from "../models/reservationModules";
// create

export const makeRequest = async (req, res) => {
  try {
    const { DateArrival, DateDeparture, peaple } = req.body;
    const make = await request.create({ DateArrival, DateDeparture, peaple });
    return res.status(200).json({
      status: "200",
      message: "Request Sent",
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
      data: delId
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to make Request",
    });
  }
};
