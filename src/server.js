const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

require("./models");

const authRoutes = require("./routes/auth");
const inventoryRoutes = require("./routes/inventory");
const prescriptionsRoutes = require("./routes/prescriptions");
const billingRoutes = require("./routes/billing");
const suppliersRoutes = require("./routes/suppliers");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/prescriptions", prescriptionsRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/suppliers", suppliersRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});

module.exports = app;
