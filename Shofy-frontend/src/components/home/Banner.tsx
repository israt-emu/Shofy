import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import banner from "../../assets/banner.jpg";
const Banner = () => {
  return (
    <section className="bg-gray-100 text-gray-800 ">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-20 lg:flex-row lg:justify-between">
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-96 xl:h-112 2xl:h-128">
          <img src={banner} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
        </div>
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <p className="text-lg font-mono">🛍️ New Arrivals 2023</p>
          <h1 className="text-5xl font-bold leadi sm:text-6xl font-serif">Explore Our New Collection</h1>
          <h3 className="mt-6 mb-8 text-2xl font-semibold text-sky-400 font-serif">Up to 70% off</h3>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link to={"/products"}>
              <Button variant={"outline"} className="bg-white text-gray-700 hover:bg-black hover:text-gray-200">
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
