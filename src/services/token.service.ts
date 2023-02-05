import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import config from "../config/config"
import { tokenTypes } from "../config/token";
import jwt from "jsonwebtoken";
import moment from "moment"
import userService from "./user.service";
import Token from "../models/Token.model";
import { ObjectId } from "mongoose";

//interfaces
import { generateAuthTokens } from "./interfaces/token.interface";

const generateToken = (userId: ObjectId, expires: any, type: string, secret: string = config.JWT_SECRET) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};


const saveToken = async (token: string, userId: ObjectId, expires: any, type: string, blacklisted: boolean = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 */
const verifyToken = async (token: string, type: string) => {
  const payload = jwt.verify(token, config.JWT_SECRET);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 */
const generateAuthTokens = async (user: any): Promise<generateAuthTokens> => {
  //set token expire time
  const accessTokenExpires = moment().add(config.JWT_EXPIRE, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.JWT_REFRESH_EXPIRATION_DAYS, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 */
const generateResetPasswordToken = async (email: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(config.JWT_RESET_PASSWORD_EXPIRE_MINUTUS, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user: any) => {
  const expires = moment().add(config.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

export = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
