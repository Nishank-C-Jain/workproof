import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

/* ✅ Create app ONCE */
const app = express();

/* ✅ Middleware */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* ✅ Test route */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ✅ Routes */
import employeeRoutes from "./Routes/empRoutes.js";
app.use("/api/employees", employeeRoutes);

import organizationRoutes from "./Routes/orgRoutes.js";
app.use("/api/organizations", organizationRoutes);

/* ✅ MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

/* ✅ Start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
