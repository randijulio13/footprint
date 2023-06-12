import { signInWithPopup, signOut } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import useAuthContext from "../contexts/AuthContext";
import { auth, googleProvider } from "../lib/firebase";
import useUser from "./useUser";

export default function useAuth() {
  const { authUser, setAuthUser } = useAuthContext();
  const { addUser, getUser } = useUser();

  const handleSignout = () => {
    setAuthUser("");
    signOut(auth);
  };

  const handleSignin = async () => {
    let result = await signInWithPopup(auth, googleProvider);
    let isUserExist = getUser(result.user.uid);
    if (isUserExist) {
      await addUser({
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        lastLogin: Timestamp.fromDate(new Date()),
      });
    } else {
      await addUser({
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        lastLogin: Timestamp.fromDate(new Date()),
        createdAt: Timestamp.fromDate(new Date()),
      });
    }
  };

  return { authUser, setAuthUser, handleSignout, handleSignin };
}
