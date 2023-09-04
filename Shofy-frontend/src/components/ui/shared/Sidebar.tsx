/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from "react";
import {AiOutlineDashboard} from "react-icons/ai";
import {AiTwotoneNotification} from "react-icons/ai";
import {BiBookReader} from "react-icons/bi";
import {TbBookUpload} from "react-icons/tb";
import {MdAnalytics} from "react-icons/md";
import {MdDashboard} from "react-icons/md";
import {MdArticle} from "react-icons/md";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
// import {sidebarActiveChange} from "../../features/activeLink/activeLinkSlice";

const Sidebar = () => {
  //

  //   const {user} = useSelector((state) => state?.auth);
  //   const {admin} = user || {};
  //   const active = useSelector((state) => state?.active?.sidebarActive);
  //   const path = useSelector((state) => state?.filter?.path);
  //   const dispatch = useDispatch();
  //sidebar link active change on path change
  //   useEffect(() => {
  //     const activeLink = path.split("/")[2];
  //     // dispatch(sidebarActiveChange(activeLink));
  //   }, [path, dispatch]);
  const active = "user";
  return (
    <div className={`md:flex flex-col h-full text-gray-700`}>
      <div className="space-y-3">
        <div className="flex-1">
          {/* sidebar link  */}
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className={`${active === "user" ? "link-active" : "link-hover"}`}>
              <Link to="/dashboard/user" className="link-styles">
                <MdDashboard className="sidebar-icon" title="Top Books!" />
                {/* <span className={`link-text transition-all duration-300 ${toggle && "hidden"}`}>Dashboard</span> */}
                Dashboard
              </Link>
            </li>
            {/* {admin && (
              <li className={`${active === "admin" ? "link-active" : "link-hover"}`}>
                <Link to="/dashboard/admin" className="link-styles">
                  <AiOutlineDashboard className="sidebar-icon" title="Top Books!" />
                  <span className={`link-text transition-all duration-300 ${toggle && "hidden"}`}>Admin Dashboard</span>
                </Link>
              </li>
            )} */}

            <li className={`${active === "user" ? "link-active" : "link-hover"}`}>
              <Link to="/dashboard/books" className="link-styles">
                <BiBookReader className="sidebar-icon" title="Books!" />
                {/* <span className={`link-text transition-all duration-300 ${toggle && "hidden"}`}>Books</span> */}
              </Link>
            </li>
            <li className={`${active === "user" ? "link-active" : "link-hover"}`}>
              <Link to="/dashboard/bookRequest" className="link-styles">
                <TbBookUpload className="sidebar-icon" title="Books!" />
                {/* <span className={`link-text transition-all duration-300 ${toggle && "hidden"}`}>Requested Books</span> */}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
