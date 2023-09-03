import {Schema, model} from "mongoose";
import {IUser, UserModel} from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
import {IExistingUser} from "../auth/auth.interface";

const UserSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
//check user existence
UserSchema.methods.isUserExist = async function (email: string): Promise<IExistingUser | null> {
  return await User.findOne({email}, {_id: 1, password: 1,  email: 1}).lean();
};
//check by id
UserSchema.methods.isUserExistById = async function (id: string): Promise<IExistingUser | null> {
  return await User.findOne({_id: id}, {_id: 1, password: 1, email: 1}).lean();
};
//check password match
UserSchema.methods.isPasswordMatched = async function (givenPass: string, savedPass: string): Promise<boolean> {
  return await bcrypt.compare(givenPass, savedPass);
};
//hasing password
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.password) {
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  }
  next();
});
//create model
export const User = model<IUser, UserModel>("User", UserSchema);
