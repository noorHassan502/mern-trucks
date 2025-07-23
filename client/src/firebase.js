// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-trucks.firebaseapp.com",
  projectId: "mern-trucks",
  storageBucket: "mern-trucks.firebasestorage.app",
  messagingSenderId: "511167071806",
  appId: "1:511167071806:web:8f8c844ecea965e025f36f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);