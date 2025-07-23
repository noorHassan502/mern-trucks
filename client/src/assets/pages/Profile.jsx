import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-lime-500'>Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <input
          type='text'
          placeholder="username"
          id='username'
          className="bg-black text-lime-400 border border-lime-500 p-3 rounded-lg placeholder-lime-600"
        />
        <input
          type='text'
          placeholder="email"
          id='email'
          className="bg-black text-lime-400 border border-lime-500 p-3 rounded-lg placeholder-lime-600"
        />
        <input
          type='text'
          placeholder="password"
          id='password'
          className="bg-black text-lime-400 border border-lime-500 p-3 rounded-lg placeholder-lime-600"
        />
        <input
          type='text'
          placeholder="cnic"
          id='cnic'
          className="bg-black text-lime-400 border border-lime-500 p-3 rounded-lg placeholder-lime-600"
        />

        <button
          className="bg-lime-400 text-black font-semibold rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer">
      Delete Account
      </span>
      <span className="text-red-700 cursor-pointer">
      Sign Out
      </span>


      </div>
    </div>
  );
};

export default Profile;
