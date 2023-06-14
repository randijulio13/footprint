import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";

export default function useFirestore(colName) {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(db, colName);

  useEffect(() => {
    const unsub = onSnapshot(collectionRef, (snapshot) => {
      const items = snapshot.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      }));
      setState(items);
    });

    return () => {
      unsub();
    };
  }, [colName]);

  const addData = async (data, options = { timestamp: false }) => {
    if (options.timestamp) {
      data = { ...data, createdAt: Timestamp.fromDate(new Date()) };
    }
    let { id } = await addDoc(collectionRef, data);
    return id;
  };

  const getData = async (column, value) => {
    const q = query(collectionRef, where(column, "==", value));
    const querySnapshot = await getDocs(q);

    return querySnapshot.map((data) => ({
      ...data.data(),
      id: data.id,
    }));
  };

  const setData = async (docId, data) => {
    await setDoc(doc(db, colName, docId), data);
  };

  const deleteData = async (docId) => {
    return await deleteDoc(doc(db, colName, docId));
  };

  return { addData, getData, setData, deleteData, state, setState };
}
