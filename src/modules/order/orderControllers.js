import orderModel from "../../../db/models/orderModel.js";
import cartModel from "../../../db/models/cartModel.js";

export const createOrder = async (req, res) => {
    try {
        const cart = await cartModel
            .findOne({ user: req.user._id })
            .populate("items.product");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const orderProducts = cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
        }));

        const totalPrice = cart.totalPrice;

        const order = await orderModel.create({
            user: req.user._id,
            products: orderProducts,
            totalPrice,
        });

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (err) {
        res.status(500).json({
            message: "Failed to place order",
            error: err.message,
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ user: req.user._id })
            .populate("products.product");

        res.json({ message: "Your orders", orders });
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch orders",
            error: err.message,
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find()
            .populate("products.product")
            .populate("user");

        res.json({ message: "All orders", orders });
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch all orders",
            error: err.message,
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await orderModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order status updated", order });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update order",
            error: err.message,
        });
    }
};
