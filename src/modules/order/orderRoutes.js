import express from "express";
import {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
} from "./orderControllers.js";

import { verifyToken } from "../../middleware/verifyToken.js";
import { isAdmin } from "../../middleware/isAdmin.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", createOrder);
router.get("/my-orders", getUserOrders);
router.get("/", isAdmin, getAllOrders);
router.put("/:id/status", isAdmin, updateOrderStatus);

export default router;
