import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../store/Auth';

export default function LogOut() {
  const dispatch = useDispatch()
  const deleteHandle=()=>{
    dispatch(logout())
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 ">
    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-1/4 h-12 mt-6"
    onClick={deleteHandle}
    >
      Log Out
    </button>
  </div>
  )
}
