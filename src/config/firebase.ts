// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTX84VxFkWPe0ttDS9nxWy3QbnYNpcNH4",
  authDomain: "react-project-565e6.firebaseapp.com",
  projectId: "react-project-565e6",
  storageBucket: "react-project-565e6.firebasestorage.app",
  messagingSenderId: "101107007842",
  appId: "1:101107007842:web:5d48e0cbcc0761cd55ec3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
