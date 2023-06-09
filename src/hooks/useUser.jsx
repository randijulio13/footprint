import React from "react";
import useFirestore from "./useFirestore";

export default function useUser() {
  const { addData, data: users } = useFirestore("users");

  const addUser = async (data) => {
    let id = await addData(data, { timestamp: true });
    return id;
  };

  return { addUser, users };
}
