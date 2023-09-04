import {Link} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {DropdownMenuLabel} from "@/components/ui/dropdown-menu";
import {DropdownMenuItem, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent} from "@/components/ui/dropdown-menu";
import {HiOutlineSearch} from "react-icons/hi";
// import Cart from "../components/Cart";
import logo from "../../../assets/logo.jpg";
const Navbar = () => {
  //   const {user} = useAppSelector((state) => state.user);

  //   const dispatch = useAppDispatch();

  //   const handleLogout = () => {
  //     console.log("Logout");
  //     signOut(auth).then(() => {
  //       // Sign-out successful.
  //       dispatch(setUser(null));
  //     });
  //   };

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div className="flex items-center">
            <img className="w-16" src={logo} alt="log" />
            <p className="font-semibold text-lg">Shofy</p>
          </div>
          <div>
            <ul className="flex items-center">
              <li className="text-accent">
                <Button variant="link" asChild>
                  <Link to="/" className="text-accent">
                    Home
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/products" className="text-accent">
                    Products
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/checkout" className="text-accent">
                    Checkout
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/dashboard" className="text-accent">
                    Dashboard
                  </Link>
                </Button>
              </li>
              {/* <li>
                <Button variant="ghost">
                  <HiOutlineSearch size="25" />
                </Button>
              </li> */}
              {/* <li>
                <Cart />
              </li> */}
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
                    <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                    {/* {!user.email && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
                        </Link>
                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">Sign up</DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {user.email && (
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        Logout
                      </DropdownMenuItem>
                    )} */}
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
