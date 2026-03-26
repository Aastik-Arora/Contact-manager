const mongoose = require("mongoose");

function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  return "mongodb://127.0.0.1:27017/contact_manager";
}

async function connectDB() {
  const mongoUri = getMongoUri();
  // Mongoose connection options are optional in modern versions.
  await mongoose.connect(mongoUri);
  return mongoose.connection;
}

module.exports = { connectDB };

