//type defining for user
export type IUser = {
  email: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  _id: string;
  seller: boolean;
};
export type IUserProps = {
  users: IUser[];
};
export type IStatProps = {
  users: number;
  products: number;
  admins: number;
};
