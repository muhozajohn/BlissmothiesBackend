import cart from "../models/CartModels";
import menu from "../models/MenuModels";
// Adding To Cart

export const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const { User } = req;

    const product = await menu.findById(id);
    if (!product) {
      return res.status(404).json({
        status: "404",
        message: "Product Id Not Found",
      });
    }

    // Check if the product is already in the cart
    const existingCart = await cart.findOne({
      cartOwner: User._id,
      productId: product._id,
    });
    if (existingCart) {
      // If the product is already in the cart, update the quantity
      existingCart.quantity += quantity || 1;
      existingCart.totalPrice = existingCart.quantity * product.price;
      await existingCart.save();
      return res.status(200).json({
        status: "200",
        message: "Cart Updated",
        data: existingCart,
      });
    }

    // If the product is not in the cart, create a new cart entry
    const newCart = await cart.create({
      cartOwner: User._id,
      productId: product._id,
      quantity: quantity || 1,
      totalPrice: (quantity || 1) * product.price,
    });

    return res.status(201).json({
      status: "201",
      message: "Product Added to Cart",
      data: newCart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Failed To Add in Cart",
      error: error.message,
    });
  }
};

// getAll Cart
export const getCart = async (req, res) => {
  try {
    const { User } = req;

    if (User.role === "admin") {
      const getAllCarts = await cart
        .find()
        .populate("cartOwner", "fullName email")
        .populate("productId", "title Sutitle image price owner");

      return res.status(200).json({
        status: "200",
        message: "All Carts Retrieved",
        data: getAllCarts,
      });
    }

    const getUserCarts = await cart
      .find({
        cartOwner: User._id,
      })
      .populate("cartOwner", "fullName email")
      .populate("productId", "title image price");

    return res.status(200).json({
      status: "200",
      message: "User's Carts Retrieved",
      data: getUserCarts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve carts",
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
// Adding Existing Cart

export const addExsting = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const { User } = req;

    const product = await menu.findById(id);
    if (!product) {
      return res.status(404).json({
        status: "404",
        message: "Product Id Not Found",
      });
    }

    // Check if the product is already in the cart
    const existingCart = await cart.findOne({
      cartOwner: User._id,
      productId: product._id,
    });
    if (existingCart) {
      // If the product is already in the cart, update the quantity
      existingCart.quantity += quantity || 1;
      existingCart.totalPrice = existingCart.quantity * product.price;
      await existingCart.save();
      return res.status(200).json({
        status: "200",
        message: "Cart Updated",
        data: existingCart,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Add in Cart",
    });
  }
};

// remove

export const removeExsting = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const { User } = req;

    const product = await menu.findById(id);
    if (!product) {
      return res.status(404).json({
        status: "404",
        message: "Product Id Not Found",
      });
    }

    // Check if the product is already in the cart
    const existingCart = await cart.findOne({
      cartOwner: User._id,
      productId: product._id,
    });
    if (existingCart) {
      // If the product is already in the cart, update the quantity
      existingCart.quantity -= quantity || 1;
      existingCart.totalPrice = existingCart.totalPrice - product.price;
      await existingCart.save();
      return res.status(200).json({
        status: "200",
        message: "Cart Updated",
        data: existingCart,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Add in Cart",
    });
  }
};
