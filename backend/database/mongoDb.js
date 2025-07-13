const mongoose = require("mongoose");

const connect = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.ATLAS_URI;
await mongoose.connect(uri, {

      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

module.exports = connect;
