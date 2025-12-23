import express from "express";
import dotenv from "dotenv";
import connectDB from "./controller/db.js";
import empRoutes from "./Routes/empRoutes.js";
import orgRoutes from "./Routes/orgRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/employees", empRoutes);
app.use("/api/organizations", orgRoutes);

export default app;
