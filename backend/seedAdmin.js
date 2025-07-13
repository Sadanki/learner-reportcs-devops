const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/admin.model"); // adjust if needed

const MONGO_URI = "mongodb://localhost:27017/learnerreportcs";

const seedAdmin = async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@example.com",
    password: hashedPassword,
    userType: "admin"
  });

  console.log("✅ Admin user inserted");
  process.exit();
};

seedAdmin();
