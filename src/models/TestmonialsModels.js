import mongoose from "mongoose";
const TestSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
      require: false,
    },
    name: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      default: "Customer, Buyer",
    },
    comment: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Testimoniols = mongoose.model("Testmoniols", TestSchema);
export default Testimoniols;
