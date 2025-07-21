import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth'; // Assuming you have this component as in the tutorial

export default function SignUp() {
  const [formData, setFormData] = useState({});
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
      setError(null); // Clear previous errors
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data); // For debugging, similar to tutorial

      if (data.success === false) {
        setLoading(false);
        // The tutorial sets error to data.message directly.
        // You might want to enhance this for specific CNIC validation errors
        // from your backend.
        setError(data.message || 'An unknown error occurred.');
        return;
      }

      setLoading(false);
      setError(null); // Clear error on success
      navigate('/sign-in'); // Navigate to sign-in on success, as per tutorial
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to connect to the server.'); // More general error message
      console.error('Fetch error:', error); // Log detailed error
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        {/* CNIC Input Field Added */}
        <input
          type='text' // Use 'text' for CNIC as it can contain hyphens (or just digits if you validate on backend)
          placeholder='CNIC (e.g., 12345-1234567-1)' // Example format
          className='border p-3 rounded-lg'
          id='cnic' // Make sure the ID matches your backend's expected field name
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}