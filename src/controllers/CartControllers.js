import cart from "../models/CartModels";
import menu from "../models/MenuModels";
// Adding To Cart

export const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await menu.findById(id);
    if (!productId) {
      return res.status(404).json({
        status: "404",
        message: "Product Id Not Found",
      });
    }

    const makeCart = await cart.create({
      cartOwner: req.User._id,
      productId: productId,
    });

    return res.status(201).json({
      status: "201",
      message: "Well Cart Added",
      data: makeCart,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Add in Cart",
    });
  }
};

// getAll Cart
export const getCart = async (req, res) => {
  try {
    const getCarts = await cart
      .find()
      .populate("cartOwner", "fullName email")
      .populate("productId", "title image price");
    return res.status(200).json({
      status: "200",
      message: "Cart Retrieved",
      data: getCarts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Retrieve item in Cart",
    });
  }
};

// delete
export const deleteToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await cart.findById(id);
    if (!productId) {
      return res.status(404).json({
        status: "404",
        message: "Product Id Not Found",
      });
    }
    await cart.findByIdAndDelete(productId);
    return res.status(200).json({
      status: "200",
      message: "Well Cart Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Deleted in Cart",
    });
  }
};
