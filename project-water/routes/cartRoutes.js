import express from "express"
import { addToCartController, getCartItemsController, removeFromCartController } from "../controllers/cartController.js";
import { isAdmin, requireSignin } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post('/add-to-cart', requireSignin, addToCartController);

// Get cart items for the logged-in user
router.get('/cart-items', requireSignin, getCartItemsController);

router.delete('/remove-from-cart/:id', requireSignin, removeFromCartController);

export default router