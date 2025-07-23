import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {
  signInSuccess,
} from '../../redux/user/userSlice';

const Header =  () => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);

  console.log("CurrentUser:", currentUser);

  const fetchUser = async (userId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/getUserById/${userId}`);
      if(res.status === 200)
      {
        const data = await res.json();
        dispatch(signInSuccess({...data.userDetail}));  
        }
      } catch (err) {
          console.error('Error fetching user:', err);
        }
      };


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if(userId !== null)
    {
      fetchUser(userId);
    }

  
  }, [dispatch]);


  return (
    <header className='bg-[#0F172A] shadow-lg'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <h1 className='font-extrabold text-xl sm:text-2xl flex flex-wrap'>
          <span className='text-[#A3E635]'>Route</span>
          <span className='text-white ml-1'>Sync</span>
        </h1>

        {/* Updated form styles */}
        <form className='bg-black p-2 rounded-full flex items-center shadow-md hover:shadow-lg transition duration-300'>
          <input
            type='text'
            placeholder='Search Trucks...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-lime-400 placeholder:text-lime-500 px-2'
          />
          <button>
            <FaSearch className='text-lime-400 hover:text-lime-300 transition duration-200' />
          </button>
        </form>

        <ul className='flex gap-6 text-base font-semibold'>
          <Link to='/'>
            <li className='hidden sm:inline text-[#A3E635] hover:text-white transition duration-200'>
              Home
            </li>
          </Link>

          <Link to='/about'>
            <li className='hidden sm:inline text-[#A3E635] hover:text-white transition duration-200'>
              About
            </li>
          </Link>

          {currentUser ? (
  <Link to='/profile'>
    <img
      className='rounded-full h-7 w-7 object-cover cursor-pointer'
      src={currentUser.avatar}
      alt='profile'
    />
  </Link>
) : (
  <Link to='/sign-in'>
    <li className='hidden sm:inline text-[#A3E635] hover:text-white transition duration-200'>
      Sign in
    </li>
  </Link>
)}

        </ul>
      </div>
    </header>
  );
};

export default Header;