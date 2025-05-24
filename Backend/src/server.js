import { config } from "dotenv";
config();

import app from "./app.js";
import connectToDB from "./config/dbConnection.js";

// Connect to the database
connectToDB()
  .then(() => {
    console.log("Database connected successfully");

    // Start the server after DB is connected
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // Handle DB connection failure
    console.error("Failed to start server:", err.message);
  });
