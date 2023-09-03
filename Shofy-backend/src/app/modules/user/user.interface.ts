import {Model} from "mongoose";
import {IExistingUser} from "../auth/auth.interface";

export type IUser = {
  email: string;
  password: string;
  name: string;
};
export type IUserMethods = {
  isUserExist(email: string): Promise<IExistingUser | null>;
  isUserExistById(id: string): Promise<IExistingUser | null>;
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
};
export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
