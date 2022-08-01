import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        id: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        img: { type: String, required: true },
        price: { type: Number, required: true },
        seller: { type: String, required: true },
        ratings: { type: Number, required: true, default: 0 },
        ratingsCount: { type: Number, required: true, default: 0 },
        stock: { type: Number, required: true, default: 0 }, 
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;