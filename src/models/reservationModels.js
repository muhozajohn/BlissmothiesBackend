import mongoose from "mongoose";

const bookTableSchema = new mongoose.Schema({
  DateArrival: {
    type: String,
    require: false,
  },
  DateDeparture: {
    type: String,
    require: false,
  },
  peaple: {
    type: String,
    require: false,
  },
  time: {
    type: String,
    require: false,
  },
  tel: {
    type: String,
    require: false,
  },
  requestOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const request = mongoose.model("request", bookTableSchema);
export default request;
