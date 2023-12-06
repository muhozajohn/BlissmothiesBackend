import request from "../models/reservationModels";
import sendMail from "../helper/sendMail"; 
export const makeRequest = async (req, res) => {
  try {
    const { DateArrival, DateDeparture, peaple, time, tel } = req.body;
    const { User } = req;
    const userEmail = User.email;
    const name = User.fullName;
    const make = await request.create({
      DateArrival,
      DateDeparture,
      peaple,
      time,
      tel,
      requestOwner: User._id,
    });

    // Customize the email message
    const emailTemplate = {
      emailTo: userEmail,
      subject: "New Reservation Request",
      message: `<h1>Dear ${name},</h1>
                <p>Thank you for choosing Blissful Smoothies! Your reservation request has been received.</p>
                <p>Reservation Details:</p>
                <ul>
                  <li>Date Arrival: ${DateArrival}</li>
                  <li>Date Departure: ${DateDeparture}</li>
                  <li>Number of People: ${peaple}</li>
                  <li>Time: ${time}</li>
                </ul>
                <p>We appreciate your business and look forward to serving you!</p>
                <p>Best regards,</p>
                <p>Kwizera Emmanuel</p>
                <p>Blissful Smoothies CEO, Keller</p>`,
    };

    // Send the customized email
    sendMail(emailTemplate);
    return res.status(201).json({
      status: "201",
      message: "Request Sent",
      data: make,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to make Request",
      error: error.message,
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
