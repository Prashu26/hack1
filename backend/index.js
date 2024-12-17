const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Middleware/error");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

process.on("uncaughtException", (err) => {
  console.log("Error : ", err.message);
  console.log("Shutting down the server due to UnCaught Exception");
  process.exit(1);
});

const connectDatabase = require("./db");
connectDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Backend!");
});

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: true,
    credentials: true,
  })
);

app.use("/api/v1/user", require("./Router/userRoute.js"));
app.use("/api/v1", require("./Router/careerRoute.js"));
app.use("/api/v1", require("./Router/QuizRoute.js"));
app.use("/api/v1", require("./Router/roadmapRoute.js"));
app.use("/api/image", express.static(`./upload/`));
app.use("/uploads", express.static("uploads"));
app.use("/api/resources", require("./Router/ResourceRoute.js"));

app.use(errorMiddleware);

const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);

process.on("unhandledRejection", (err) => {
  console.log("Error: ", err.message);
  console.log("Shutting down the server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
