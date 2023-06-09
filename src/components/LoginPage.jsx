import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { authUser, handleSignin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) navigate("/");
  }, [authUser]);


  return (
    <div>
      <button onClick={handleSignin}>Signin</button>
    </div>
  );
}
