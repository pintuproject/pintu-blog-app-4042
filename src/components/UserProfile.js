import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';  
 

const UserProfile = () => {
  const { isLogin,setToken } = useContext(UserContext); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 
   

 
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken("")
    window.location.reload();
     
  };

  if (!isLogin) {
    return null;  
  }

  return (
    <div className="relative inline-block">
    
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-white bg-gray-200 rounded-full focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span className="sr-only">Open user menu</span>
         
        <img
          className="h-10 w-10 rounded-full"
          src="../user.png" 
          alt="User avatar"
        />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
          <p></p>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
             Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
