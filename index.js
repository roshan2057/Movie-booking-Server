import express from "express";
import router from "./src//Route/Route.js";
import "dotenv/config.js";
import cors from "cors";
import("./src/Model/Connection.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/", router);

app.listen(4000, () => {
  console.log("listing inport 4000");
});
