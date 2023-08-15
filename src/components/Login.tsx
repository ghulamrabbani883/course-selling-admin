import { LoginOutlined } from "@mui/icons-material";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, courseState, userState } from "../state/atoms/adminatom";
import Loader from "./Loader";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const setUser = useSetRecoilState(userState);
  const {isUserLoading} = useRecoilValue(userState)
  const {isCourseLoading} = useRecoilValue(courseState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleLoginClick = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setUser((prev)=>{
      return {...prev,isUserLoading:true}
    })
    const res = await axios.post(BASE_URL + "/login", loginData);
    if (res.data.token !== "") {
      localStorage.setItem("courseToken", res.data.token);
      setUser((prev)=>{
        return {...prev, user:res.data, isAuthenticated:true, isUserLoading:false}
      })
      alert(res.data.msg);
      navigate("/courses");
    } else {
      alert(res.data.msg);
    }
    setLoginData((prev) => {
      return { ...prev, email: "", password: "" };
    });
  };

  if(isUserLoading || isCourseLoading){
    return <Loader />
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
        // disableGutters
      >
        <CssBaseline>
          <Box
            display="flex"
            border="1px solid grey"
            borderRadius={2}
            boxShadow={5}
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            minHeight={400}
            width={350}
            alignSelf="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton color="primary" size="large">
                <LoginOutlined sx={{ fontSize: "36px" }} />
              </IconButton>
              <Typography variant="h5" align="center">
                Login
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={3}
              flexDirection="column"
              alignItems="center"
              width={"100%"}
              padding={3}
            >
              <TextField
                required
                id="outlined-basic"
                label="Email"
                fullWidth
                variant="outlined"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Email"
              ></TextField>
              <TextField
                required
                variant="outlined"
                label="Password"
                fullWidth
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter password"
              ></TextField>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </Box>
            <Typography>
              <Link to="/register">New User | Register</Link>
            </Typography>
          </Box>
        </CssBaseline>
      </Container>
    </>
  );
};

export default Login;
