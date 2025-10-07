import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log("Error Connecting MongoDB", error.message);
  }
};

export default connectToMongoDb;