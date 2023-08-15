import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, courseState, userState } from "../state/atoms/adminatom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Loader from "./Loader";
const Register = () => {
  const [userData, setUserData] = useState({ name:"", email: "", password: "" });
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const {isUserLoading} = useRecoilValue(userState)
  const {isCourseLoading} = useRecoilValue(courseState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setUser((prev)=>{
      return {...prev,isUserLoading:true}
    })
    const res = await axios.post(BASE_URL + "/signup", userData);
    console.log(res.data);
    if (res.data.token !== "") {
      localStorage.setItem("courseToken", res.data.token);
      setUser((prev)=>{
        return {...prev, user:res.data, isAuthenticated:true, isUserLoading:false}
      })
      alert(res.data.msg);
      navigate("/courses");
    } else {
      setUser((prev)=>{
        return {...prev, isAuthenticated:false, isUserLoading:false}
      })
      alert(res.data.msg);
    }
    setUserData({ name: "", email:"", password: "" });
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
                <AccountCircleIcon sx={{ fontSize: "36px" }} />
              </IconButton>
              <Typography variant="h5" align="center">
                Register
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
                label="Name"
                fullWidth
                variant="outlined"
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Name"
              ></TextField>
              <TextField
                required
                id="outlined-basic"
                label="Username"
                fullWidth
                variant="outlined"
                type="email"
                name="email"
                value={userData.email}
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
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter password"
              ></TextField>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Box>
            <Typography>
              <Link to="/login">Already have an account | Login</Link>
            </Typography>
          </Box>
        </CssBaseline>
      </Container>
    </>
  );
};

export default Register;
