import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import User from "../models/User.model";
import ApiError from "../utils/ApiError";

import { userBody, userBodyUpdate } from "./interfaces/user.interface";

const createUser = async (userBody: userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};


const queryUsers = async (filter: object, options: object) => {
  const users = await User.paginate(filter, options);
  return users;
};


const getUserById = async (id: ObjectId) => {
  return User.findById(id);
};


const getUserByEmail = async (email: string) => {
  return User.findOne({ email });
};


const updateUserById = async (userId: ObjectId, updateBody: userBodyUpdate) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && User.isEmailTaken(updateBody.email, userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};


const deleteUserById = async (userId: ObjectId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

export = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
