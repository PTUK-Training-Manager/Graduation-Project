import { createContext, useState, ReactNode } from "react";

export type AuthContextType = {
  auth: any;
  setAuth: (auth: any) => void;
};

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
