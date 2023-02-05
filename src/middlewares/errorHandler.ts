import mongoose from 'mongoose';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import config from '../config/config';
import logger from '../config/logger';
import { Request, Response, NextFunction, } from "express"

export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message as string, true, err.stack);
  }
  next(error);
};

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  let { statusCode, message } = err;
  if (config.IS_PRODUCTION && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(!config.IS_PRODUCTION && { stack: err.stack }),
  };

  if (!config.IS_PRODUCTION && !config.IS_TEST) {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
