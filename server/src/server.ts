import { app } from "./app";
import connectDB from "./utils/db";
require("dotenv").config();
import { v2 as cloudinary } from "cloudinary";

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// create server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is connected with port ${process.env.PORT || 8000}`);
  connectDB();
});
