import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <header className='bg-black shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-yellow-400'>Route</span>
          <span className='text-yellow-400'>Sync</span>
        </h1>

        <form className='bg-yellow-100 p-2 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search Trucks...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-black placeholder:text-black'
          />
          <button>
            <FaSearch className='text-black' />
          </button>
        </form>

        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-yellow-400 hover:underline'>
              Home
            </li>
          </Link>

          <Link to='/about'>
            <li className='hidden sm:inline text-yellow-400 hover:underline'>
              About
            </li>
          </Link>

          <Link to='/sign-in'>
            <li className='text-yellow-400 hover:underline'>
              Sign in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
