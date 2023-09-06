/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";
import {MdEmail, MdPassword, MdPhone} from "react-icons/md";
import {useSignUpMutation} from "@/redux/features/auth/authApi";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetPassword, setRepetPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [seller, setSeller] = useState(false);
  const [signUp, {data: responseData, isLoading, error: responseError}] = useSignUpMutation();
  const navigate = useNavigate();

  //showing success or error message when signup
  useEffect(() => {
    if (!responseData?.success && responseError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (responseData?.success && responseData?.data) {
      Swal.fire("Congratulations!", `Account created successfully!`, "success");
      navigate("/login");
    }
  }, [responseData, responseError, navigate]);
  //signUp user
  const handleSubmit = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    if (password !== repetPassword) {
      Swal.fire("Oops!", `Password didn't match`, "error");
      return;
    } else {
      const data = {
        name: {
          firstName,
          lastName,
        },
        email,
        phoneNumber: phone,
        password,
        seller,
      };
      signUp(data);
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
                    <input type="text" className="signup-input" placeholder="First Name" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
                    <span className="input-right-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex mb-6">
                    <input type="text" className="signup-input" placeholder="Last Name" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
                    <span className="input-right-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="flex mb-6">
                  <input type="email" className="signup-input" placeholder="Your Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                  <span className="input-right-icon">
                    <MdEmail className="w-5 h-5" />
                  </span>
                </div>
                <div className="flex mb-6">
                  <input type="text" className="signup-input" placeholder="Phone number" value={phone} required onChange={(e) => setPhone(e.target.value)} />
                  <span className="input-right-icon">
                    <MdPhone className="text-lg w-5 h-5" />
                  </span>
                </div>
                <div className="flex mb-6">
                  <input type="password" required className="signup-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span className="input-right-icon">
                    <MdPassword className="w-5 h-5" />
                  </span>
                </div>
                <div className="flex ">
                  <input type="password" required className="signup-input" placeholder="Repeat Your Password" value={repetPassword} onChange={(e) => setRepetPassword(e.target.value)} />
                  <span className="input-right-icon">
                    <MdPassword className="w-5 h-5" />
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" name="" id="" onChange={(e) => setSeller(e.target.checked)} />
                  <p>I am a Seller</p>
                </div>
              </div>
              <div className="">
                <div>
                  <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-primary text-gray-300 mt-8 flex items-center justify-center" disabled={isLoading}>
                    {isLoading && <svg className="animate-spin h-5 w-5 mr-3 text-white rounded-full border-4 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" viewBox="0 0 24 24"></svg>}
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
