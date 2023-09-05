/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";
import {useLoginMutation} from "@/redux/features/auth/authApi";
import {MdEmail, MdPassword} from "react-icons/md";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, {data, isLoading, error: responseError}] = useLoginMutation();
  const navigate = useNavigate();
  //

  useEffect(() => {
    if (!data?.success && responseError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }
    if (data?.success && data?.data?.accessToken) {
      Swal.fire("Congratulations!", `Logged In successfully!`, "success");
      navigate("/");
    }
  }, [data, responseError, navigate]);

  //login
  const handleLogin = (e: {preventDefault: () => void}): void => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      login({
        email,
        password,
      });
    } else {
      Swal.fire("Sorry!", `Please fill up all required fields`, "info");
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center mx-auto px-2 mt-5 md:mt-0 w-3/5">
      {/* login form  */}

      <div className="flex flex-col md:p-6 rounded-md sm:p-10 text-gray-800 w-full">
        <h2 className="font-bold text-center mx-auto">
          <img src={logo} className="w-10" alt="" />
        </h2>
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Login</h1>
          <p className="text-sm text-gray-700">Login to access your account</p>
        </div>
        <form className=" ng-untouched ng-pristine ng-valid" onSubmit={handleLogin}>
          <div className="w-4/6 mx-auto">
            <div className="flex mb-6">
              <input type="email" className="signup-input" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <span className="input-right-icon ">
                <MdEmail className="w-5 h-5" />
              </span>
            </div>
            <div className="flex">
              <input type="password" required className="signup-input" placeholder="*****" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="input-right-icon">
                <MdPassword className="w-5 h-5" />
              </span>
            </div>
            <div>
              <div className="flex justify-between mt-2 ">
                <div className="">
                  {" "}
                  <input className="form-check-input appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-white checked:bg-accent checked:border-main focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label inline-block text-sky-800 font-semibold" htmlFor="flexCheckDefault">
                    Remember Me
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 w-4/6 mx-auto">
            <div>
              <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-primary text-gray-300 mt-8 flex justify-center items-center" disabled={isLoading}>
                {isLoading && <svg className="animate-spin h-5 w-5 mr-3 text-white rounded-full border-4 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" viewBox="0 0 24 24"></svg>}
                <span>Login</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <p className="md:px-6 text-sm text-center text-gray-700 align-bottom mt-8 w-4/6 mx-auto">
        Don't have an account yet?
        <Link to="/signup" className="hover:underline text-sky-500 ml-1 font-bold">
          Quick Sign up here
        </Link>
        .
      </p>
    </div>
  );
};

export default LoginForm;
