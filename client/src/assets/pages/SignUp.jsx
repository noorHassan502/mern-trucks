import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-[#A3E635]'>Sign Up</h1>
      <form  className='flex flex-col gap-4 bg-[#0F172A] p-6 rounded-xl shadow-lg'>
        <input
          type='text'
          placeholder='Username'
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E635] placeholder-gray-500'
          id='username'
        
        />
        <input
          type='text'
          placeholder='Email'
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E635] placeholder-gray-500'
          id='email'
        
        />
        <input
          type='password'
          placeholder='Password'
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E635] placeholder-gray-500'
          id='password'
         
        />
        <input
          type='text'
          placeholder='CNIC (e.g. 1234512345671)'
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3E635] placeholder-gray-500'
          id='cnic'
        
        />
        <button
          type='submit'
          className='bg-[#A3E635] text-[#0F172A] font-semibold py-2 rounded-lg hover:bg-[#C0F250] transition duration-300'
        >
          Sign Up
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
