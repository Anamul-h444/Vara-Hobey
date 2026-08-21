/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/config/db.js
 * Description: MongoDB database connection configuration with custom DNS resolver.
 * ==============================================================================
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Load Environment Variables
dotenv.config();

// Custom DNS Resolver Setup (Prevents SRV resolution timeouts on restricted networks)
dns.setServers(['1.1.1.1', '8.8.8.8']);

/**
 * Connect to MongoDB Cluster
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is not defined in the .env file!');
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};