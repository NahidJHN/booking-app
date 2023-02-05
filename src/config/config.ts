//External Lib  import
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });
const APPLICATION_NAME = process.env.APPLICATION_NAME || "";
const ENVIRONMENT = process.env.APP_ENV || "dev";
const IS_PRODUCTION = ENVIRONMENT === "production";
const IS_TEST = ENVIRONMENT === "test";
const APP_PORT = Number(process.env.APP_PORT) || 8080;
const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || "/api/v1";
const JWT_SECRET = process.env.JWT_SECRET || "foo";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1y";
const JWT_REFRESH_EXPIRATION_DAYS = 90
const JWT_RESET_PASSWORD_EXPIRE_MINUTUS =
  process.env.JWT_RESET_PASSWORD_EXPIRE_MINUTUS || 15;
const DB = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_USER_PWD,
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
  PORT: Number(process.env.DB_PORT) || 27017,
};
const JWT_VERIFY_EMAIL_EXPIRATION_MINUTES = 10
const email = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: 25,
    secure: false,
    auth: {
      user: process.env.SMTP_AUTH_USERNAME,
      pass: process.env.SMTP_AUTH_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  from: process.env.EMAIL_FROM,
};

const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/foo";
const FORGET_VERIFY_URI = process.env.FORGET_VERIFY_URI;

export default {
  APPLICATION_NAME,
  ENVIRONMENT,
  IS_PRODUCTION,
  IS_TEST,
  APP_PORT,
  APP_PREFIX_PATH,
  JWT_SECRET,
  JWT_EXPIRE,
  JWT_REFRESH_EXPIRATION_DAYS,
  JWT_RESET_PASSWORD_EXPIRE_MINUTUS,
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  DB,
  email,
  DB_URI,
  FORGET_VERIFY_URI

}