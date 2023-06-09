import firebase from "firebase/app";
import { useEffect, useState } from "react";

function useFirestore(collection) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data dari Firebase saat komponen pertama kali dirender
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = firebase.firestore();
        const snapshot = await db.collection(collection).get();
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [collection]);

  // Menambahkan data baru ke Firebase
  const addData = async (newData) => {
    try {
      const db = firebase.firestore();
      const docRef = await db.collection(collection).add(newData);
      const newItem = {
        id: docRef.id,
        ...newData,
      };
      setData((prevData) => [...prevData, newItem]);
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };

  // Memperbarui data di Firebase
  const updateData = async (id, updatedData) => {
    try {
      const db = firebase.firestore();
      await db.collection(collection).doc(id).update(updatedData);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      );
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  // Menghapus data dari Firebase
  const deleteData = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection(collection).doc(id).delete();
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  return { data, loading, addData, updateData, deleteData };
}

export default useFirestore;
