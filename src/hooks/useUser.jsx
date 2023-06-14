import { doc, setDoc } from "firebase/firestore";
import useUserContext from "../contexts/UserContext";
import { db } from "../lib/firebase";

export default function useUser() {
  const { users } = useUserContext();

  const addUser = async (data) => {
    await setDoc(doc(db, "users", data.uid), data);
  };

  const getUser = (id) => {
    return users.find((user) => user.id === id);
  };

  return { addUser, users, getUser };
}
