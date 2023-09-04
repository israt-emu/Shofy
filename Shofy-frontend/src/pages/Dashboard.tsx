/* eslint-disable @typescript-eslint/no-unused-vars */
import {ProductTable} from "@/components/products/ProductTable";
import Sidebar from "@/components/ui/shared/Sidebar";
import React, {useEffect} from "react";
import {useState} from "react";
import {MdArrowBack} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     dispatch(pathChange(location?.pathname));
  //     if (location?.pathname !== "/dashboard/search") {
  //       dispatch(resetSearch());
  //     }
  //   }, [location, dispatch]);
  //auth checking on route change
  //   useEffect(() => {
  //     const jwtExpired = jwtVerify();
  //     if (jwtExpired) {
  //       dispatch(userLoggedOut());
  //       localStorage.clear();
  //     }
  //   }, [location, dispatch]);

  return (
    <div className={` bg-primary`}>
      <div className="grid md:grid-cols-12 ">
        <div className={`col-span-1 h-screen fixed ${toggle ? "-left-96 md:left-0 w-14" : "left-0 w-44"}  shadow-md  z-50  transition-all duration-300 bg-main`}>
          {" "}
          <Sidebar />
        </div>
        <div className={`text-primary overflow-y-scroll no-scrollbar ${toggle ? "col-start-2 px-4 transition-all duration-300" : "col-start-3 transition-all duration-300 pr-8"} col-end-13 h-screen mt-20 z-0`}>
          <button className="flex items-center px-2 py-1 bg-second text-white rounded mb-3" onClick={() => navigate(-1)}>
            <MdArrowBack className="mr-1" />
            Back
          </button>
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
