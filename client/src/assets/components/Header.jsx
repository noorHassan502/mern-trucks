import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <header className='bg-[#0F172A] shadow-lg'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <h1 className='font-extrabold text-xl sm:text-2xl flex flex-wrap'>
          <span className='text-[#A3E635]'>Route</span>
          <span className='text-white ml-1'>Sync</span>
        </h1>

        <form className='bg-white p-2 rounded-full flex items-center shadow-md hover:shadow-lg transition duration-300'>
          <input
            type='text'
            placeholder='Search Trucks...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-gray-900 placeholder:text-gray-500 px-2'
          />
          <button>
            <FaSearch className='text-[#0F172A] hover:text-[#1E293B] transition duration-200' />
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

          <Link to='/sign-in'>
            <li className='hidden sm:inline text-[#A3E635] hover:text-white transition duration-200'>
              Sign in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
