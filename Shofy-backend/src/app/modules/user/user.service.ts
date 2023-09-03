import {IUser} from "./user.interface";
import {User} from "./user.model";

//get all users
export const getAllUsersService = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};

//get a single user
export const getSingleUserService = async (id: string): Promise<IUser | null> => {
  const user = await User.findById({_id: id});
  return user;
};
