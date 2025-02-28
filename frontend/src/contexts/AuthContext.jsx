import { createContext, useContext, useState } from "react";

export const AuthContext=createContext(null);

export const useAuth=()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider=({children})=>{
const [user,setUser]=useState({id:0,fullName:""});
<AuthContextProvider  value={{user,setUser}}> {children}</AuthContextProvider>
}