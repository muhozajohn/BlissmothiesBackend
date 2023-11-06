import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: false,
  },
  content: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  }

});

const event = mongoose.model("Events", eventSchema);
export default event;
