import mongoose from "mongoose";
import counterModel from './counterModel.js';

// Define the order schema
const orderSchema = new mongoose.Schema({
    orderId: { type: Number, unique: true },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    payment: {},
    dateAndTime: {
        type: String
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]
    },
    totalPrice: {
        type: Number
    }
}, { timestamps: true });

// Middleware to auto-increment orderId before saving
orderSchema.pre('save', async function (next) {
    if (!this.isNew) return next();
    try {
        const counter = await Counter.findOneAndUpdate({ _id: 'orderId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
        this.orderId = counter.seq;
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('Order', orderSchema);