import { config } from "dotenv";
config();

import express from "express";

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server Listening of Port ${process.env.PORT}`);
});
