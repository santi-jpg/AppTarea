import 'dotenv/config';
import mongoose from 'mongoose';

export const connectDB = async () => {
  console.log('MONGO_URI:', process.env.MONGO_URI); // Depuración
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Salir si hay error
  }
};