import productModel from "../../../db/models/productModel.js";

export const addProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body);
        res.status(201).json({ message: "Product added", product });
    } catch (err) {
        res.status(500).json({
            message: "Failed to add product",
            error: err.message,
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ message: "All products", products });
    } catch (err) {
        res.status(500).json({
            message: "Failed to get products",
            error: err.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product updated", product });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update product",
            error: err.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndDelete(id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted", product });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete product",
            error: err.message,
        });
    }
};
