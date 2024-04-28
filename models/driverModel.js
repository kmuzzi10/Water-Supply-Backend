import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
    {
        driverId: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
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
        lat:{
            type:String
        },
        long:{
            type:String
        }
    },
    { timestamps: true }
);

export default mongoose.model("Driver", driverSchema);