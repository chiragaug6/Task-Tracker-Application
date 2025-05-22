import app from "./app.js";
import { config } from "dotenv";
config();

// Port config
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is Running At PORT ${PORT}`);
});
