const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const routes = require("./routes/index"); 
const authRoutes = require('./routes/auth')
const farmRoutes = require("./routes/farm");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/users");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/api", routes);
app.use("/api/auth",authRoutes)
app.use("/api/farms", farmRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", userRoutes);

app.use((req, res) => {
  console.log(`❌ 404 Error: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "API Not Found" });
});

module.exports = app;
