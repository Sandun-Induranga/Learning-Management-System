import { config } from "dotenv";
config();

import express from "express";
import db from "mongoose";

const app = express();

db.connect(process.env.MONGO_DB_URL!)
  .then(() => {
    console.log("Db Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server Listening of Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to Connect with MongoDb : " + error);
  });
