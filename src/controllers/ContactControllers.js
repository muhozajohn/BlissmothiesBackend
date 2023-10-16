import contactModule from "../models/contactModules";
import sendMail from "../helper/sendMail";
export const createMessage = async (req, res) => {
  try {
    // bdmw xwie pvhk euki
    const { name, email, subject, message } = req.body;
    const sendMessage = await contactModule.create({
      name,
      email,
      subject,
      message,
    });

    const emailTemplate = {
      emailTo: email,
      subject: subject,
      message: `<h1> Dear ${name}, </h1> <br/>   We're pleased to inform you that we've received well your feedback. 
       Thank you for reaching out to BlissMothies! We'll be back soon to satisfy your cravings. 🍔🍕🍱 <br/> <br/>  
      <p> Best regards,</p>
      <p>Kwizera Emmanuel</p>
       <p>BlissMothies Ceo, Keller </p><br/> `,
    };

    sendMail(emailTemplate);
    // console.log(emailTemplate);
    return res.status(200).json({
      message: "Message Send Succesfully",
      data: sendMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Send Message",
      error: error.message,
    });
  }
};

// getAll
export const getMessage = async (req, res) => {
  try {
    const getMessage = await contactModule.find();
    return res.status(200).json({
      message: "Message Recieved Succesfully",
      data: getMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Recieve Message",
      error: error.message,
    });
  }
};
// getSingle
export const getSIngleMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const getMessage = await contactModule.findById(id);
    if (!getMessage) return res.status(404).json({ message: "Id Not Found" });
    return res.status(200).json({
      message: "Message Recieved Succesfully",
      data: getMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Recieve Message",
      error: error.message,
    });
  }
};
// delete
export const delMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const getMessage = await contactModule.findById(id);
    if (!getMessage) return res.status(404).json({ message: "Id Not Found" });
    await contactModule.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Message Deleted Succesfully",
      data: getMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Recieve Message",
      error: error.message,
    });
  }
};

// update
export const upMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const { id } = req.params;
    const getMessage = await contactModule.findById(id);
    if (!getMessage) return res.status(404).json({ message: "Id Not Found" });
    const upm = await contactModule.findByIdAndUpdate(id, {
      name,
      email,
      subject,
      message,
    });
    return res.status(200).json({
      message: "Message Updated Succesfully",
      data: upm,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Update Message",
      error: error.message,
    });
  }
};
// update Message
export const replyMessage = async (req, res) => {
  try {
    const { reply } = req.body;
    const { id } = req.params;
    const getMessage = await contactModule.findById(id);
    if (!getMessage) return res.status(404).json({ message: "Id Not Found" });
    const upm = await contactModule.findByIdAndUpdate(id, {
      reply,
    });
    const emailTemplate = {
      emailTo: getMessage.email,
      subject: "Thank you for reaching out to BlissMothies!",
      message: `<h1> Dear ${getMessage.name}, </h1> <br/>  ${reply} 🍔🍕🍱 <br/> <br/>  
      <p> Best regards,</p>
      <p>Kwizera Emmanuel</p>
       <p>BlissMothies Ceo, Keller </p><br/> `,
    };

    sendMail(emailTemplate);
    return res.status(200).json({
      message: "Message Updated Succesfully",
      data: upm,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Update Message",
      error: error.message,
    });
  }
};
