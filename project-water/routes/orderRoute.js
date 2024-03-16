import express from "express"
import { isAdmin, requireSignin } from "../Middleware/authMiddleware.js";
import { getAllOrderController, getOrderController, postOrderController, updateOrderController } from "../controllers/orderController.js";
const router = express.Router()



//post order

router.post("/post-order", postOrderController)
//orders
router.get("/get-orders", requireSignin, getOrderController)

//all orders
router.get("/all-orders", requireSignin, isAdmin, getAllOrderController)

//order update

router.put("/order-status/:orderId", requireSignin, isAdmin, updateOrderController)





export default router;