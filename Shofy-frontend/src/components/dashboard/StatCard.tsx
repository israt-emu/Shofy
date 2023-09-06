import {IStatProps} from "@/interfaces/user";
import {FaShopify, FaUserShield} from "react-icons/fa";
import {FiUsers} from "react-icons/fi";

const StatCard = ({users, products, admins}: IStatProps) => {
  return (
    <div className="my-8 mx-auto">
      <div className="grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-3">
        <div className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-green-200 border border-green-500`}>
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-green-500 text-xl text-white">
            <FaShopify />
          </div>
          <div className="flex flex-col justify-center align-middle text-black">
            <p className="text-3xl font-semibold leading-none">{products}</p>
            <p className="capitalize font-medium text-lg">Products</p>
          </div>
        </div>
        <div className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-pink-200 border border-pink-500`}>
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-pink-500 text-xl text-white">
            <FaUserShield />
          </div>
          <div className="flex flex-col justify-center align-middle text-black">
            <p className="text-3xl font-semibold leading-none">{admins}</p>
            <p className="capitalize font-medium text-lg">Admins</p>
          </div>
        </div>
        <div className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-indigo-200 border border-indigo-500`}>
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-indigo-500 text-xl text-white">
            <FiUsers />
          </div>
          <div className="flex flex-col justify-center align-middle text-black">
            <p className="text-3xl font-semibold leading-none">{users}</p>
            <p className="capitalize font-medium text-lg">Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
