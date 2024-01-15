// deps
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./routes/user");
const admin = require("./routes/admin");
const product = require("./routes/products");
const sales = require("./routes/sales");
require("dotenv/config");
const PORT = process.env.PORT || 2000
const server = express();

const MONGO_CREDENCIALS = process.env.MONGODB_URI; 
  mongoose.connect(MONGO_CREDENCIALS)
  .then(() => {
    console.log("CONNECTED TO AUTO-TECH CLUSTER");
  })
  .catch((err) => {
    console.log("COULDN'T CONNECT TO CLUSTER", err);
  });

server.use(cors())
server.use(express.json());

// routes
server.use("/api/auth", user)
server.use("/api/product", product)
server.use("/api/sales", sales)
server.use("/api/admin", admin)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})