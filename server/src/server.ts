import { app } from "./app";
import connectDB from "./utils/db";
require("dotenv").config();

// create server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is connected with port ${process.env.PORT || 8000}`);
  connectDB();
});
