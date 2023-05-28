import React, { useState } from "react";
import Layout from "../Core/Layout";
import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { MdLockOutline } from "react-icons/md";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuth } from "./helpers";
import { toast } from "react-toastify";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log("SIGNIN SUCCESS", response);
        // save the response (user, token) localstorage/cookie
        authenticate(response, () => {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
          });
          toast.success(`Hey ${response.data.user.name}, Welcome back!`);
        });
      })
      .catch((error) => {
        console.log("SIGNIN ERROR", error.response.data);
        setValues({ ...values });
        toast.error(error.response.data.error);
      });
  };

  return (
    <>
      <Layout>
        {isAuth() ? <Redirect to="/" /> : null}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
              <MdLockOutline />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={clickSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={email}
                // name="email"
                onChange={handleChange("email")}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={password}
                // name="password"
                onChange={handleChange("password")}
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={handleClickShowPassword}
                      sx={{ cursor: "pointer" }}
                    >
                      {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    to="/forgotpassword"
                    variant="body2"
                    style={{ color: "#1976d2" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  Don't have an account?
                  <Link to="/signup" variant="body2">
                    <span style={{ color: "#1976d2" }}> Sign Up</span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
}

export default Signin;
