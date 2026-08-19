require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
app.use("/api/auth", authRoutes);
const ticketRoutes = require("./routes/ticketRoutes");

app.use("/api/tickets", ticketRoutes);
const githubRoutes = require("./routes/githubRoutes");
app.use("/api/github", githubRoutes);
startServer();