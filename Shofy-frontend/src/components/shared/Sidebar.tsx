/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect} from "react";
import {FaProductHunt} from "react-icons/fa";

import {MdDashboard, MdHome, MdManageAccounts} from "react-icons/md";
import {Link, useLocation} from "react-router-dom";
import logo from "../../assets/logo.png";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {sidebarActiveChange} from "@/redux/features/activeLink/activeLinkSlice";
import {pathChange} from "@/redux/features/filter/filterSlice";
//sidebar of seller dashboard
const Sidebar = () => {
  //
  const active = useAppSelector((state) => state?.active?.sidebarActive);
  const path = useAppSelector((state) => state?.filter?.path);
  const dispatch = useAppDispatch();
  const location = useLocation();
  //sidebar link active change on path change
  useEffect(() => {
    const activeLink = path.split("/")[2];
    dispatch(sidebarActiveChange(activeLink));
  }, [path, dispatch]);
  //changing path when route change
  useEffect(() => {
    dispatch(pathChange(location?.pathname));
  }, [location, dispatch]);
  return (
    <div className={`md:flex flex-col bg-gray-300 h-full text-gray-800`}>
      <div className="space-y-3  ">
        <div className="flex-1">
          <img src={logo} alt="logo" className="w-14" />
          {/* sidebar link  */}
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className={`${active === "seller" ? "link-active" : "link-hover"}`}>
              <Link to="/dashboard/seller" className="link-styles">
                <MdDashboard className="sidebar-icon" title="Top Books!" />
                Dashboard
              </Link>
            </li>

            <li className={`${active === "addProduct" ? "link-active" : "link-hover"}`}>
              <Link to="/dashboard/addProduct" className="link-styles">
                <FaProductHunt className="sidebar-icon" title="Add Product" />
                Add product
              </Link>
            </li>
            <li className={`${active === "manage" ? "link-active" : "link-hover"}`}>
              <Link to="/dashboard/manage" className="link-styles">
                <MdManageAccounts className="sidebar-icon" title="Management" />
                Product Management
              </Link>
            </li>
            <li className={`${active === "/" ? "link-active" : "link-hover"}`}>
              <Link to="/" className="link-styles">
                <MdHome className="sidebar-icon" title="Home" />
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
