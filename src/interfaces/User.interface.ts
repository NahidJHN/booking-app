import { Document,Model, ObjectId } from "mongoose"

export interface IUserModel extends Document{
    name:string,
    email:string,
    password:string,
    role:string,
    isEmailVerified:boolean,
    isPasswordMatch(password:string):boolean
}


//static method for user
export interface userMethods extends Model<IUserModel> {
    isEmailTaken(email:string,excludeUserId?:ObjectId): boolean;
    paginate(query:object,options?:object): any;
  }