import { ConnectOptions } from "mongoose";

const {
  MONGO_USERNAME,
  MONGO_PASSWORD = "",
  MONGO_CLUSTER,
  MONGO_DATABASE,
} = process.env;

export const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(
  MONGO_PASSWORD
)}@${MONGO_CLUSTER}.wpaubqn.mongodb.net/${MONGO_DATABASE}`;

export const MONGO_OPTIONS: ConnectOptions = {};
