import orderModel from "../models/orderModel.js";


export const postOrderController = async (req, res) => {
    try {
        const { products , dateAndTime, buyer, status, totalPrice } = req.body;

        // Create a new order instance
        const newOrder = new orderModel({
            products,
            payment:"Cash On Delivery",
            dateAndTime,
            buyer,
            status,
            totalPrice
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder); // Return the saved order in response
    } catch (error) {
        res.status(400).json({ message: error.message }); // Return error message if any
    }
}




export const getOrderController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name").populate("status");
        res.json(orders)
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "something went wrong in getting orders",
            err
        })
    }
}

//get all orders controller

export const getAllOrderController = async (req, res) => {
    try {
        const orders = await orderModel.find({})
            .populate("products", "-photo")
            .populate({
                path: "buyer",
                select: "name address" // Include both name and address fields
            })
            .populate("status")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("Error in getting orders:", err);
        res.status(500).json({
            success: false,
            message: "Something went wrong in getting orders",
            error: err.message // Instead of full error object, sending only the error message
        });
    }
};



//update order controller

export const updateOrderController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.status(200)
        res.json(orders)
    } catch (err) {
        console.error("Error in getting orders:", err);
        res.status(500).json({
            success: false,
            message: "Something went wrong in getting orders",
            error: err.message // Instead of full error object, sending only the error message
        });
    }
}
