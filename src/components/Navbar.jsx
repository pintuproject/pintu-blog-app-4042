
import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';  

const Navbar = () => {
  const[isLogin,setIsLogin]=useState(false)
  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token)
      setIsLogin(true)
  },[])
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleCreateBlog = () => {
    navigate('/create-blog')
  };
console.log(isLogin)
  return (
    <nav className="bg-white shadow-md p-4 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../blog.jpg" className="h-20" alt="Blog Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Blog
          </span>
        </a>
        <div className="flex items-center space-x-4">
          {isLogin ? (
            <>
              <UserProfile />  
              <button
                type="button"
                onClick={handleCreateBlog}
                className="text-white bg-blue-600 hover:bg-green-700 font-medium rounded-lg text-sm px-6 py-3.5"
              >
                Create Blog
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-6 py-3.5"
            >
            Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
