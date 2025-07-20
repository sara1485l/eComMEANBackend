import express from "express";
import {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} from "./productControllers.js";

import { verifyToken } from "../../middleware/verifyToken.js";
import { isAdmin } from "../../middleware/isAdmin.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", verifyToken, isAdmin, addProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;
