import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import userState from '../atoms/userStateAtom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { URL } from '../utils/backendUrl.js';

function Login() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(userState)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await axios.post(`${URL}/user/login`, {
      username,
      password
    },{
      withCredentials:true
    })

    const data = response.data

    if(data["status"] === 'error'){
     toast.error(data["message"]);
     return
    }

    setIsUserLoggedIn(true)
    navigate("/documents");
    console.log(data['message']);
    console.log(data['status']);
    
  };

  useEffect(()=>{
    if(isUserLoggedIn){
      navigate('/documents')
    }
  },[isUserLoggedIn])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-blue-600">Login</h1>
        <form onSubmit={handleSubmit} className="mt-6">

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>


          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
          >
            Login
          </button>
        </form>


        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
          
        </div>
      </div>

      <ToastContainer/>
    </div>
  );
}

export default Login;
