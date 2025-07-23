import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signInSuccess } from '../../redux/user/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const fetchUser = async (userId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/getUserById/${userId}`);
      if (res.status === 200) {
        const data = await res.json();
        dispatch(signInSuccess({ ...data.userDetail }));
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      fetchUser(userId);
    }
  }, [dispatch]);

  return (
    <header className='bg-slate-900 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <h1 className='font-extrabold text-xl sm:text-2xl flex flex-wrap'>
          <span className='text-lime-400'>Route</span>
          <span className='text-white ml-1'>Sync</span>
        </h1>

        {/* Search bar */}
        <form className='bg-black border border-lime-500 p-2 rounded-full flex items-center shadow-md hover:shadow-lg transition duration-300'>
          <input
            type='text'
            placeholder='Search Trucks...'
            className='bg-transparent text-lime-400 placeholder-lime-500 focus:outline-none w-24 sm:w-64 px-2'
          />
          <button type='submit'>
            <FaSearch className='text-lime-400 hover:text-lime-300 transition duration-200' />
          </button>
        </form>

        <ul className='flex gap-6 text-base font-semibold'>
          <Link to='/'>
            <li className='hidden sm:inline text-lime-400 hover:text-white transition duration-200'>
              Home
            </li>
          </Link>

          <Link to='/about'>
            <li className='hidden sm:inline text-lime-400 hover:text-white transition duration-200'>
              About
            </li>
          </Link>

          {currentUser ? (
            <Link to='/profile'>
              <img
                className='rounded-full h-8 w-8 object-cover cursor-pointer border-2 border-lime-400'
                src={currentUser.avatar}
                alt='profile'
              />
            </Link>
          ) : (
            <Link to='/sign-in'>
              <li className='hidden sm:inline text-lime-400 hover:text-white transition duration-200'>
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
