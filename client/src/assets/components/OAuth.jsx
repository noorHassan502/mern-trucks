import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart()); // ✅ Begin loading state
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Google Sign-In failed');
      }

      console.log('User from backend:', data); // Optional debug

      const res1 = await fetch('http://localhost:3000/api/auth/saveOrUpdateUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });

  
      if(res1.status == 200)
      {
        localStorage.setItem("userId", data._id);
      }
      
      dispatch(signInSuccess(data)); // ✅ Set user in Redux
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message)); // ✅ Store error in Redux
      console.error('Could not sign in with Google:', error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-black text-lime-400 p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with Google
    </button>
  );
}
