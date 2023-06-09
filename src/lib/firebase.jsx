import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9AGsStTZw0oMOtbZ7YzTSvYdOfiiCCeE",
  authDomain: "superchat-e01c1.firebaseapp.com",
  projectId: "superchat-e01c1",
  storageBucket: "superchat-e01c1.appspot.com",
  messagingSenderId: "177503198206",
  appId: "1:177503198206:web:575f4330a4cb2407d63eaf",
  measurementId: "G-XE1YWPNX5Z",
};
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
