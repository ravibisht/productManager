import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is Required"]
    },
    price: {
        type: Number,
        required: [true, "Product Price is Required"]
    },
    featured: {
        type: Boolean,
        required: false,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: "${VALUE} currently not supported"
        }
    }
})

export default mongoose.model('Product',projectSchema)