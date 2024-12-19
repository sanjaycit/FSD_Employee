import express from "express";
import db from "./db.js";
import cors from "cors";
import { addEmployee } from "./register.js";
import dotenv from "dotenv";
const PORT = 8080;
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.post("/add", addEmployee);
app.listen(PORT, async () => {
  try {
    console.log(`Server running on ${PORT}`);
    await db.connect((err) => {
      if (err) {
        console.log(err.message);
        return;
      } else {
        console.log("Database connected");
      }
    });
  } catch (error) {
    console.log(error.messsage);
  }
});
