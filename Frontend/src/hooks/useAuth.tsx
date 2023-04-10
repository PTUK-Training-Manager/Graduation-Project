import { useContext } from "react";
import AuthContext, { AuthContextType } from "../context/AuthProvider";

const useAuth = (): AuthContextType => {
    return useContext(AuthContext);
}

export default useAuth;
