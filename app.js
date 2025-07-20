import express from "express";
import { dbConnection } from "./db/dbconnection.js";

import userRoutes from "./src/modules/user/userRoutes.js";
import productRoutes from "./src/modules/product/productRoutes.js";
import cartRoutes from "./src/modules/cart/cartRoutes.js";
import orderRoutes from "./src/modules/order/orderRoutes.js";

const app = express();


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

dbConnection;

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
