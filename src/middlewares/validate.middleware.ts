import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import Ajv from "ajv";
import formatsPlugin from "ajv-formats";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true })
formatsPlugin(ajv)
ajvErrors(ajv)


const validate = (schema: any) => (req: Request, _res: Response, next: NextFunction) => {
    const filter = ajv.compile(schema)
    const isValid = filter({ ...req.body, ...req.params })

    if (!isValid) {
        const errorMessage = filter.errors?.map((error) => error.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage ?? ""));
    }
    return next();
};

export default validate;
