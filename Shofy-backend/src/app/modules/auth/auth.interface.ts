import {Types} from "mongoose";

export type ILoginUser = {
  email: string;
  password: string;
};

export type IExistingUser = {
  _id: Types.ObjectId;
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
