import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cnic: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      console.log('Form data:', formData); // Debugging
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setLoading(false);
        setError(data.message || 'An unknown error occurred.');
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to connect to the server.');
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto min-h-screen'>
      <h1 className='text-3xl text-center font-bold my-7 text-black'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          className='bg-black text-lime-400 placeholder-lime-600 p-3 rounded-lg'
          id='username'
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='Email'
          className='bg-black text-lime-400 placeholder-lime-600 p-3 rounded-lg'
          id='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='bg-black text-lime-400 placeholder-lime-600 p-3 rounded-lg'
          id='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
  type='text'
  placeholder='CNIC (13 digits or 12345-1234567-1)'
  id='cnic'
  value={formData.cnic}
  onChange={handleChange}
  className='bg-black text-lime-400 placeholder-lime-600 p-3 rounded-lg'
  required
/>

        <button
          disabled={loading}
          className='bg-lime-500 text-black font-semibold p-3 rounded-lg uppercase hover:bg-lime-600 disabled:opacity-80 transition duration-200'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5 text-black'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-lime-600 hover:underline'>Sign in</span>
        </Link>
      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
