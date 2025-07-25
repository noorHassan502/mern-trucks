import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {  getDownloadURL,getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../../firebase"; 

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
   const [formData, setFormData] = useState({});
  

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

   
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-lime-500'>Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
           <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

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
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
