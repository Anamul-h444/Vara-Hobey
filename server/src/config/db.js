import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// DNS সার্ভার কনফিগারেশন (ES Module সিনট্যাক্স)
dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in .env file!');
    }
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};