import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  cartOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menu",
      require: true,
    },
  ],
});

const cart = mongoose.model("carts", CartSchema);
export default cart;
