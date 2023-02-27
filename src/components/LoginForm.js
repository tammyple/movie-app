import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../contexts/AuthContext";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";

const style = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(
    "https://external-preview.redd.it/B6MrrY-dyD1lnvvrb2BCISx1xQwGx-e7pjm-qeXwAkE.jpg?auto=webp&s=ade83a5a759042ffed5324e5172c9a59a27aaaa9"
  )`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundColor: "grey",
  backgroundBlendMode: "multiply",
};

const formStyle = {
  marginTop: 8,
  marginRight: 0,
  marginLeft: 0,
  padding: 4,
  width: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: `rgba(000, 000, 000, 0.75)`,
  opacity: 0.8,
  // background: `linear-gradient(rgb(50, 50, 50) 0%, rgb(63, 63, 63) 40%, rgb(28, 28, 28) 150%), linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.25) 200%)`,
};

function LoginForm({ callback }) {
  const [username] = useState("web virgil learner");
  const [password] = useState("123456");

  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = () => {
    auth.singin(username, callback);
  };

  return (
    <div className="login" sx={style}>
      <Avatar
        variant={"rounded"}
        alt="The image"
        src={"https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"}
        sx={{
          width: "100px",
          height: "30px",
          backgroundColor: "transparent",
        }}
      />
      <Box sx={formStyle}>
        <Typography variant="h5" component="div">
          Sign In
        </Typography>
        <TextField
          disabled
          fullWidth
          label="Username"
          default="user"
          value={username}
          sx={{ m: 1 }}
        />
        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            disabled
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button
          onClick={handleLogin}
          sx={{ mt: 3, mb: 2, bgcolor: "red", width: "100%" }}
          variant="contained"
        >
          <Typography sx={{ color: "white" }}>Sign In</Typography>
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" sx={{ color: "error.main" }}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" sx={{ color: "error.main" }}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default LoginForm;
