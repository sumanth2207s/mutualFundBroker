import express from "express";
import { json } from "body-parser";
import dotenv from 'dotenv'
import router from "./api";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(json());

app.use(router)

app
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Connection error:", err);
  });
