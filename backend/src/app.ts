import { config } from "dotenv";
config();

import express from "express";
import db from "mongoose";
import routes from "./routes";
import { json, urlencoded } from "body-parser";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", routes);

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
