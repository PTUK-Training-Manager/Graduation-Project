import { createContext,useState } from "react";
const Authcontext =createContext({});

export const AuthProvider  = (children:any)  => {
  const [auth,setauth] = useState({});
  return (
    <div>
      <Authcontext.Provider value={{auth,setauth}}>
        {children}
      </Authcontext.Provider>
    </div>
  )
}

export default Authcontext
