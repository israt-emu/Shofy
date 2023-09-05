import {ReactNode} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {useAppSelector} from "../redux/hooks";

export interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({children}: IProps) => {
  const isLoggedIn = useAuth();
  const {isLoading} = useAppSelector((state) => state?.auth);
  const {pathname} = useLocation();

  if (!isLoggedIn && !isLoading) {
    return <Navigate to="/login" state={{path: pathname}} />;
  }

  return children;
};
export default PrivateRoute;
