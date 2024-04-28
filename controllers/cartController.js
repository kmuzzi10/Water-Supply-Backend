// cartController.js
import Cart from "../models/cartModel.js";

// Add item to cart
export const addToCartController = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cartItem = new Cart({ userId, productId, quantity });
        await cartItem.save();
        res.status(201).json({ success: true, message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Get cart items for a user
export const getCartItemsController = async (req, res) => {
    try {
        const userId = req.user._id;
        const cartItems = await Cart.find({ userId }).populate('productId');
        res.json({ success: true, cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



// cartController.js

// Remove item from cart
export const removeFromCartController = async (req, res) => {
    try {
        const userId = req.user._id; // Getting user ID from request
        const productId = req.params.id; // Getting product ID from request params
        // Find the cart item for the user and product
        const cartItem = await Cart.findOne({ userId, productId });
        // If the item is not found, return error
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
        // Remove the item from the cart
        await Cart.deleteOne({ userId, productId });
        res.json({ success: true, message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
