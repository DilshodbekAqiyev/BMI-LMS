import mongoose, { set } from "mongoose";
require("dotenv").config();

const dbURL = process.env.DB_URL || "";

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURL).then((data: any) => {
      console.log(`Database connected with database ${data.connection.name}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
