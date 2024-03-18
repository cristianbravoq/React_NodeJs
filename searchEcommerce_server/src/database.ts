import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

mongoose.connect(config.DB.URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection stablished");
});

connection.once("error", (error) => {
  console.log(error);
  process.exit(0);
});
