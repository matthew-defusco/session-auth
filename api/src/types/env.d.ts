declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number;
      MONGO_PASSWORD: string;
      SESSION_SECRET: string;
      REDIS_PORT: number;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
