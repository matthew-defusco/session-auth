import mongoose from "mongoose";
import Redis from "ioredis";
import RedisStore from "connect-redis";

import { REDIS_OPTIONS, APP_PORT, MONGO_URI, MONGO_OPTIONS } from "./config";

import { createApp } from "./app";

(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

  const client = new Redis(REDIS_OPTIONS);

  const store = new (RedisStore as any)({ client });

  const app = createApp(store);

  app.listen(APP_PORT, () =>
    console.log(
      `http://localhost:${APP_PORT} here's a test: ${process.env.TEST}`
    )
  );
})();
