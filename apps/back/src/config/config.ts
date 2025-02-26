import * as dotenv from 'dotenv';

dotenv.config();
export const config = () => ({
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpireTime: process.env.JWT_EXPIRE_TIME,
  redisUrl: process.env.REDIS_URL,
});
