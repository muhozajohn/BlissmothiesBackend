import mongoose from "mongoose";

const bookTableSchema = new mongoose.Schema({
  DateArrival: {
    type: String,
    require: true,
  },
  DateDeparture: {
    type: String,
    require: true,
  },
  peaple: {
    type: String,
    require: true,
  },
});

const request = mongoose.model("request", bookTableSchema);
export default request;
