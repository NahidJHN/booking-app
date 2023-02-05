//External Lib Import
import { Response, NextFunction, Request } from 'express';
import passport from "passport"
import httpStatus from 'http-status';
import { roleRights } from "../config/roles"

//Internal Lib Import
import ApiError from '../utils/ApiError';

interface IUser {
    role: string,
    id: string,
    updatedAt: Date,
    createdAt: Date
}

const verifyCallback = (req: Request, resolve: Function, reject: Function, requiredRights: string[]) => async (err: any, user: IUser, info: any) => {
    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredRights.length) {
        const userRights: any = roleRights.get(user.role);
        const hasRequiredRights = requiredRights.every((requiredRight: string) => userRights.includes(requiredRight));
        if (!hasRequiredRights && req.params.userId !== user.id) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
        }
    }

    resolve();
};

const auth = (...requiredRights: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

export default auth;
