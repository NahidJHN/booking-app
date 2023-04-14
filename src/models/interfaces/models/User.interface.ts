import { Document, Model, ObjectId } from "mongoose"

export interface IUser {
    name: string,
    email: string,
    password: string,
    role: string,
    isEmailVerified: boolean,
}

//methods interface
export interface IUserMethods {
    isPasswordMatch(password: string): Promise<boolean>;
}

// static method for user
export interface IUserModel extends Model<IUser, {}, IUserMethods> {
    isEmailTaken(email: string, excludeUserId?: ObjectId): boolean;
    paginate(query: object, options?: object): any;
}


