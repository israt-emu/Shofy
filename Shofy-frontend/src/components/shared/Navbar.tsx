import {Link} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {DropdownMenuLabel} from "@/components/ui/dropdown-menu";
import {DropdownMenuItem, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent} from "@/components/ui/dropdown-menu";
import logo from "../../assets/logo.png";
import {userLoggedOut} from "@/redux/features/auth/authSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {FaCartPlus} from "react-icons/fa";
import {useGetSingleCartQuery} from "@/redux/features/cart/cartApi";
import {useGetSingleUserQuery} from "@/redux/features/auth/authApi";
const Navbar = () => {
  const {user} = useAppSelector((state) => state?.auth);
  const {data} = useGetSingleCartQuery(user.id);
  const {data: userData} = useGetSingleUserQuery(user?.id);
  const cartTotal = data?.data?.products?.length;
  const dispatch = useAppDispatch();
  //log out
  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
  };
  console.log(userData);

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10 text-primary">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div className="flex items-center">
            <img className="w-16" src={logo} alt="log" />
            <p className="font-semibold text-lg">Shofy</p>
          </div>
          <div>
            <ul className="flex items-center">
              <li className="">
                <Button variant="link" asChild>
                  <Link to="/" className="text-gray-900">
                    Home
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/products" className="text-gray-900">
                    Products
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/checkout" className="text-gray-900">
                    Checkout
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/orders" className="text-gray-900">
                    Orders
                  </Link>
                </Button>
              </li>
              {userData?.data?.seller === true && (
                <li>
                  <Button variant="link" asChild>
                    <Link to="/dashboard/seller" className="text-gray-900">
                      Dashboard
                    </Link>
                  </Button>
                </li>
              )}
              {/* //cart  */}
              <li>
                <Link to="/cart" className="text-gray-900 flex items-center">
                  <FaCartPlus />
                  <p>({cartTotal})</p>
                </Link>
              </li>
              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* login signup btton render depending on users email  */}
                    {!user?.email && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
                        </Link>
                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">Sign up</DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {user?.email && (
                      <>
                        <DropdownMenuItem className="cursor-pointer font-semibold font-serif">{userData?.data?.name?.firstName}</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                          Logout
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
