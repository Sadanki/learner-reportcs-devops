const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connect = require("./database/mongoDb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// require("dotenv").config();
require("dotenv").config({ path: "config.env" });

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cors({
  origin: ["http://localhost:3000", "http://192.168.49.2:3000"],
  credentials: true
}));



const studentRoutes = require("./routes/student.routes");
const adminRoutes = require("./routes/admin.routes");
const careerServiceRoutes = require("./routes/careerService.routes");
const facultyRoute = require("./routes/facultyRoute");
const questionUploadRoute =  require("./routes/questionUpload.routes");
const batchRegisterRoute = require("./routes/batchRegister.route")
const getBatchRoute = require("./routes/common.route");
const attendanceRoute = require("./routes/attendance.routes")
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
//app.use(cors());

app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/careerService", careerServiceRoutes);
app.use("/faculty", facultyRoute);
app.use("/", getBatchRoute);
app.use("/", questionUploadRoute)
app.use("/batch" , batchRegisterRoute)
app.use("/attendance" , attendanceRoute)

// app.use("/users",);

app.get("/", (req, res) => {
  res.send("Hello World! check");
});

app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "Backend is working ✅" });
});

// Async server start after DB connection
const startServer = async () => {
  try {
    await connect();
    app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});

  } catch (err) {
    console.error("Failed to connect to MongoDB, server not started", err);
    process.exit(1); // Exit process with failure
  }
};


startServer();
