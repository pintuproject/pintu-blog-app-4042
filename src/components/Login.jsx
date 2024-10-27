import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { UserContext } from './UserContext';
import { useContext } from 'react';
 
 

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const[errorMessage,setErrrorMessage]=useState('')
  
    const navigate=useNavigate()
   const{ setIsLogin,setToken,handleLogin}=useContext(UserContext);

  

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCredentials({ ...credentials, [name]: value });
    };
 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, credentials);
          console.log(response.data.token)
          const token = response.data.token;
          setIsLogin(true)
          setToken(token)
          handleLogin(token)
          console.log("sucess")
          localStorage.setItem('token', token);
          console.log('navigation')
          navigate('/home')
           
        }catch (error) {
            setErrrorMessage(error.response?.data?.message)
             

           }
        }
          const handleSignUp=()=>{
            navigate('/signup')

          }
     
    
  return (
    <>
   
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="./blog.jpg"
            className="mx-auto h-100 w-100"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}  className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleInputChange}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/app" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

          </form>
          
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <button type="button" onClick={handleSignUp}className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> Sign up</button>
 
          </p>
        </div>
      </div>
      
     
</>

  )
}

export default Login