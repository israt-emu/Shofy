import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import {Outlet, useLocation} from "react-router-dom";
//layout of this website that render depending on route
const MainLayout = () => {
  const location = useLocation();
  return location.pathname.includes("/dashboard") ? (
    <div className={``}>
      <div className="grid md:grid-cols-12 ">
        <div className={`col-span-1 h-screen fixed left-0 w-44 shadow-md  z-50  transition-all duration-300 bg-main`}>
          {" "}
          <Sidebar />
        </div>
        <div className={`text-primary overflow-y-scroll no-scrollbar col-start-3 transition-all duration-300 pr-8 col-end-13 h-screen mt-8 z-0 pb-8`}>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
