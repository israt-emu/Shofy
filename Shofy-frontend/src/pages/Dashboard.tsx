/* eslint-disable @typescript-eslint/no-unused-vars */

import StatCard from "@/components/dashboard/StatCard";
import UserTable from "@/components/dashboard/UserTable";
import {IUser} from "@/interfaces/user";
import {useGetAllUsersQuery} from "@/redux/features/auth/authApi";
import {useGetProductsQuery} from "@/redux/features/products/productApi";

const Dashboard = () => {
  const {data} = useGetAllUsersQuery("");
  const {data: product} = useGetProductsQuery("");
  const seller = data?.data?.filter((user: IUser) => user?.seller === true);
  return (
    <div className={`text-gray-800 w-11/12 mx-auto`}>
      <h1 className="font-semibold text-3xl font-serif">Seller Dashboard:</h1>
      <StatCard users={data?.data.length} products={product?.data?.length} admins={seller?.length} />
      <h1 className="font-semibold text-2xl font-serif my-3">Users Table:</h1>
      <UserTable users={data?.data} />
    </div>
  );
};

export default Dashboard;
