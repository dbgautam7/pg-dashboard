import { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";
import { IAuthDetails } from "../types";
import { cookieAuthKey } from "../utils/constants";

const initialState: IAuthDetails = {
  token: "",
  userInfo: {},
  permissions: [],
};
const AuthContext = createContext({
  auth: initialState,
  setAuth: (_auth: IAuthDetails) => {
    //
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const cookie = new Cookies();
  const authDetails = cookie.get(cookieAuthKey);
  const currentAuthState = authDetails ? authDetails : initialState;
  const [auth, setAuth] = useState<IAuthDetails>(currentAuthState);

  console.log(auth, "auth");
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
