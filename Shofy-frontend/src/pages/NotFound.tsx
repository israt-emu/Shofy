import {Link} from "react-router-dom";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-14">
      <h1 className="text-5xl font-bold">404</h1>
      <h1 className="text-3xl my-3">Sorry! Page not found</h1>
      <Link to="/">
        <button className="bg-primary text-gray-200 py-1 px-2">Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
