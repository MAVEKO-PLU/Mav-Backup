import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../api.js";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const loggedIn = await login(email, password);
      setIsLoading(false);
      if (loggedIn) {
        navigate("/supplier");
      } else {
        setError(true);
      }
    }, 500);
  };

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <div
      className="centerDiv"
      style={{ justifyContent: "center", width: "100vw", display: "flex" }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "25vw",
        }}
        noValidate
        autoComplete="off"
      >
        <h1>MAVEKO PLU MODULE</h1>
        <TextField
          id="filled-basic"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <br />
        <TextField
          id="filled-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <br />
        <Button
          onClick={handleSignIn}
          variant="contained"
          fullWidth
          disabled={isLoading}
          sx={{ padding: "20px", position: "relative", backgroundColor:"#063970", }}
        >
          Sign In
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Button>

        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseError} severity="error">
            Invalid email or password. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}
