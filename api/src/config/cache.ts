import { RedisOptions } from "ioredis";

const { REDIS_PORT = 123, REDIS_HOST, REDIS_PASSWORD } = process.env;

export const REDIS_OPTIONS: RedisOptions = {
  host: REDIS_HOST,
  port: +REDIS_PORT,
  password: REDIS_PASSWORD,
};
