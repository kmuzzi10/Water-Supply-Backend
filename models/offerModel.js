// models/offerModel.js
import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
});

export default mongoose.model('Offer', offerSchema);
