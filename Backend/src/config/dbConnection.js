import mongoose from "mongoose";

// Async function to connect to the MongoDB database
const connectToDB = async () => {
  try {
    // Attempt to connect using the MONGO_URI
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
    // Exit the process if connection fails
    process.exit(1);
  }
};

export default connectToDB;
