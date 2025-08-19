import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js"
import movieRoutes from "./routes/movies.js"



dotenv.config();
const PORT = process.env.PORT;


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);


const startServer = () => {
  app.listen(PORT, () => {
    console.log(`✅ Backend running on port ${PORT}`);
  });
};


// starting the server only after the database connection
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");
    startServer();
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });

