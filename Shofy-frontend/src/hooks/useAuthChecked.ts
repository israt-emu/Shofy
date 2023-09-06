import {useState} from "react";
import {useEffect} from "react";
import {useAppDispatch} from "../redux/hooks";
import {useAuth} from "./useAuth";
import {userLoggedIn, userLoggedOut} from "@/redux/features/auth/authSlice";

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    if (!useAuth) {
      dispatch(userLoggedOut());
    } else {
      const auth = JSON.parse(localStorage.getItem("auth")!);
      dispatch(userLoggedIn(auth));
    }
    setAuthChecked(true);
  }, [dispatch]);
  return authChecked;
};
