import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AppLayout from "src/AppLayout/AppLayout";


type RequireAuthProps = {
  allowedRoles: number;
  children?: React.ReactNode;
};

const RequireAuth:React.FC<RequireAuthProps> = ({ allowedRoles,children }: RequireAuthProps) =>  {
  const { auth } = useAuth();
  const location = useLocation();

  console.log('allowedRoles', allowedRoles);
  console.log('auth.role', auth.role);
  console.log('auth', auth);
 console.log(auth && auth.role === allowedRoles);


    return (
      auth && auth.role === allowedRoles
      ? <Outlet />
        : auth?.username
          ? <Navigate to="/signIn" state={{ from: location }} replace />
          : <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
  }; 
  

export default RequireAuth;