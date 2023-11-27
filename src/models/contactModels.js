import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    reply: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const contactModule = mongoose.model("Contact", contactSchema);
export default contactModule;
