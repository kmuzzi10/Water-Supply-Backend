import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        rquired: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    size: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
}, { timestamps: true })


export default mongoose.model('Product', productSchema)