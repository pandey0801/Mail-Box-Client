import React from 'react'
import { useRef, useState } from 'react';

export default function Login() 
{

   

      const email = useRef("");
      const password1 = useRef("");
      const password2 = useRef("");

  const [isLogIn, setIsLogIn] = useState(true);
//   const theme = useSelector((state)=>state.themeUse.isDarkMode)
const theme = true;

const switchMood = () => {
    setIsLogIn((prevState) => !prevState);
  };


  return (
    <>
        
        <div className={`flex flex-col justify-center items-center min-h-screen ${theme ? 'bg-gray-900':'bg-gray-100'} `}>
          <div className={`w-96 p-8 rounded-lg shadow-lg m-9 h-[28rem] ${theme ?'bg-gray-800':'bg-white'}`}>
            {isLogIn ? (
              <h1 className={`text-2xl mb-8 font-bold text-center ${theme? 'text-white':'text-gray-900'}`} >Log in</h1>
            ) : (
              <h1 className={`text-2xl mb-8 font-bold text-center ${theme? 'text-white':'text-gray-900'}`}>Sign Up</h1>
            )}

       
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className={`display-block text-sm font-medium mb-2 ${theme?'text-white':'text-gray-900'}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  ref={email}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className={`display-block text-sm font-medium mb-2 ${theme?'text-white':'text-gray-900'}`}
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  ref={password1}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className={`display-block text-sm font-medium mb-2 ${theme?'text-white':'text-gray-900'}`}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  ref={password2}
                />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  {isLogIn ? "Log In" : "Sign Up"}
                </button>
              
              </div>
            </form>
          </div>

          <button
            className="w-80 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-green-800 dark:text-gray-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            onClick={switchMood}
          >
            <span className="w-80 relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-700 dark:bg-green-200 rounded-md group-hover:bg-opacity-0">
              Have an account? Login
            </span>
          </button>
        </div>
    </>
  )
}



