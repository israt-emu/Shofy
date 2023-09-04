/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo.jpg";
// import {useSignUpMutation} from "../redux/features/auth/authApi";
import Swal from "sweetalert2";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetPassword, setRepetPassword] = useState("");
  //   const [signUp, {data: responseData, isLoading, error: responseError}] = useSignUpMutation();
  const navigate = useNavigate();

  //
  //   useEffect(() => {
  //     if (!responseData?.success && responseError) {
  //       Swal.fire("Oops!", `Something Went wrong`, "error");
  //     }

  //     if (responseData?.success && responseData?.data) {
  //       navigate("/login");
  //     }
  //   }, [responseData, responseError, navigate]);
  //signUp user
  const handleSubmit = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    if (password !== repetPassword) {
      Swal.fire("Oops!", `Password didn't match`, "error");
      // console.log(password);
      return;
    } else {
      const data = {
        name,
        email,
        password,
      };
      //   signUp(data);
    }
  };

  return (
    <div className="h-screen flex">
      {/*  signUp form  */}
      <div className=" flex flex-col justify-center items-center w-full pb-4 bg-gray-300">
        <div className="bg-gray-100 shadow-lg py-4 md:w-2/5 flex flex-col justify-center items-center rounded mt-4">
          <div className="flex flex-col sm:p-10  md:pt-6 md:pb-4 rounded-md  text-gray-800 w-full">
            <div className="mb-4 text-center">
              <img src={logo} className="w-10 mx-auto" alt="" />

              <h1 className="mb-3 mt-2 text-3xl font-bold uppercase">Create Account</h1>
            </div>
            <form className=" ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit}>
              <div className="">
                <div className="flex items-center gap-2 w-full">
                  <div className="flex mb-6">
                    <input type="text" className="rounded-none rounded-l-lg border text-gray-900 block flex-1 min-w-0 w-1/2 text-sm border-gray-400 p-2.5" placeholder="First Name" value={name} required onChange={(e) => setName(e.target.value)} />
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex mb-6">
                    <input type="text" className="rounded-none rounded-l-lg border text-gray-900 block flex-1 min-w-0 w-1/2 text-sm border-gray-400 p-2.5" placeholder="Last Name" value={name} required onChange={(e) => setName(e.target.value)} />
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="flex mb-6">
                  <input type="email" className="rounded-none rounded-l-lg border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-400 p-2.5 " placeholder="Your Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>
                  </span>
                </div>
                <div className="flex mb-6">
                  <input type="text" className="rounded-none rounded-l-lg border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-400 p-2.5" placeholder="Phone number" value={name} required onChange={(e) => setName(e.target.value)} />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </span>
                </div>
                <div className="flex mb-6">
                  <input type="password" required className="rounded-none rounded-l-lg border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-400 p-2.5" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                </div>
                <div className="flex ">
                  <input type="password" required className="rounded-none rounded-l-lg border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-400 p-2.5" placeholder="Repeat Your Password" value={repetPassword} onChange={(e) => setRepetPassword(e.target.value)} />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="">
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md bg-primary text-gray-300 mt-8 flex items-center justify-center"
                    //   disabled={isLoading}
                  >
                    {/* {isLoading && <svg className="animate-spin h-5 w-5 mr-3 text-white rounded-full border-4 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" viewBox="0 0 24 24"></svg>} */}
                    <p> Sign Up</p>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <p className="px-6 text-sm text-center align-bottom pb-2 text-gray-700">
            Already have an account?
            <Link to="/login" className="hover:underline font-bold ml-1 text-sky-500">
              Please Login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
