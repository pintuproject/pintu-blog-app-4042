import { createContext, useState } from "react";
import { useEffect } from "react";

export const UserContext=createContext()

export const UserProvider=({children})=>{
  const [isLogin,setIsLogin]= useState(false);
  const[token,setToken]=useState(localStorage.getItem('token')||'')
  
  useEffect(() => {
    if (token) {
        setIsLogin(true);
    }
}, [token]);
const handleLogin = (newToken) => {
  localStorage.setItem('token', newToken);
  setToken(newToken);
  setIsLogin(true);
};

const handleLogout = () => {
  localStorage.removeItem('token');
  setToken('');
  setIsLogin(false);
};

    
    return(
      <UserContext.Provider value={{isLogin,setIsLogin,token,setToken,handleLogin,handleLogout}}>
        {children}
      </UserContext.Provider>
    )
}


