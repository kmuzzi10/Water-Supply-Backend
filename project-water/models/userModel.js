import mongoose from "mongoose";
import counterModel from './counterModel.js'; // Update with actual path

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: Number
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: {},
            required: true,
        },
        role: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await counterModel.findByIdAndUpdate({_id: 'userId'}, {$inc: {seq: 1}}, {new: true, upsert: true});
        this.userId = counter.seq;
    }
    next();
});

export default mongoose.model("User", userSchema);
