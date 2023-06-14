import { Google } from "@mui/icons-material";
import { Box, Button, CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { authUser, handleSignin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) navigate("/");
  }, [authUser]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          background: "url(https://picsum.photos/1920/1080)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            startIcon={<Google />}
            onClick={handleSignin}
            variant="contained"
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </>
  );
}
