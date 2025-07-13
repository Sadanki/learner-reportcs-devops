import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import HeroVired from "../../images/herovired.png";
import DataContext from "../../context/DataContext";

const theme = createTheme();

const Login = () => {
  const ctx = useContext(DataContext);
  const navigate = useNavigate();

  const [manageLogin, setManageLogin] = useState({
    email: "",
    password: "",
    type: "",
    errorMsg: "",
    isError: false,
  });

  const handleChange = (event) => {
    setManageLogin((prev) => ({
      ...prev,
      type: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, type } = manageLogin;

    if (!email || !password || !type) {
      alert("Please fill all fields including user type.");
      return;
    }

    const apiBase = process.env.REACT_APP_API_BASE;
    const loginUrl = `${apiBase}/${type}/login`;

    console.log("🔗 Submitting to:", loginUrl);
    console.log("📦 Payload:", { email, password });

    try {
      const res = await axios.post(loginUrl, { email, password });

      if (res.status === 200 && res.data) {
        ctx.loginHandler({
          isLoggedIn: true,
          userDetails: res.data.result,
          type: res.data.result.userType,
          token: res.data.token,
        });

        if (res.data.result.userType === "admin") {
          navigate("/dashboard");
        } else if (res.data.result.userType === "student") {
          navigate("/student");
        } else if (res.data.result.userType === "faculty") {
          navigate("/facultydashboard");
        }
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setManageLogin((prev) => ({
        ...prev,
        isError: true,
        errorMsg:
          err.response?.data?.error || "Login failed. Please check your credentials.",
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: `url(${HeroVired})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {manageLogin.isError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {manageLogin.errorMsg}
              </Alert>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) =>
                  setManageLogin((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) =>
                  setManageLogin((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="user-type-label">User Type</InputLabel>
                <Select
                  labelId="user-type-label"
                  value={manageLogin.type}
                  label="User Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"student"}>Student</MenuItem>
                  <MenuItem value={"faculty"}>Faculty</MenuItem>
                  <MenuItem value={"careerService"}>Career Services</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
