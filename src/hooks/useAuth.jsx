import { signInWithPopup, signOut } from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import useAuthContext from "../contexts/AuthContext";
import { auth, db, googleProvider } from "../lib/firebase";

export default function useAuth() {
  const { authUser, setAuthUser } = useAuthContext();

  const handleSignout = () => {
    setAuthUser("");
    signOut(auth);
  };

  const addUser = async (data) => {
    await setDoc(doc(db, "users", data.uid), data);
  };

  const handleSignin = async () => {
    let result = await signInWithPopup(auth, googleProvider);
    await addUser({
      uid: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      lastLogin: Timestamp.fromDate(new Date()),
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  return { authUser, setAuthUser, handleSignout, handleSignin };
}
