//External Lib Import
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const createToken = async (payLoad: object): Promise<any> => {
  return jwt.sign(payLoad, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
};

export const decodedToken = async (token: string): Promise<any> => {
  return jwt.verify(token, config.JWT_SECRET);
};
