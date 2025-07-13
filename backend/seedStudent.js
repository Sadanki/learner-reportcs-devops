const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGO_URI = "mongodb://localhost:27017/blog_mern";

const studentSchema = new mongoose.Schema({
  email: String,
  password: String,
  userType: String,
});

const Student = mongoose.model("Student", studentSchema);

const seedStudent = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash("123456", 10);

    await Student.create({
      email: "student@example.com",
      password: hashedPassword,
      userType: "student",
    });

    console.log("✅ Hashed student inserted.");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding student:", err);
  }
};

seedStudent();
