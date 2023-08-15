import SchoolIcon from "@mui/icons-material/School";
import { useState } from "react";
import { ChangeEvent } from "react";
import { MouseEvent } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { BASE_URL, courseState, parseToken, userState } from "../state/atoms/adminatom";
import Loader from "./Loader";

const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = parseToken();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    imagelink: "",
    published: false,
  });
  const [{isCourseLoading}, setCourseDetail] = useRecoilState(courseState);
  const {isUserLoading} = useRecoilValue(userState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdateCourseClick = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    
    axios.defaults.headers.common["bearertoken"] = token;
    setCourseDetail((prev)=>{
      return {...prev, isCourseLoading:true}
    })
    const res = await axios.put(BASE_URL + `/courses/${courseId}`, courseData);
    setCourseData({
      title: "",
      description: "",
      price: "",
      imagelink: "",
      published: false,
    });
    setCourseDetail((prev)=>{
      return {...prev, isCourseLoading:false}
    })
    if (res.data.msg !== "") {
      alert(res.data.msg);
      navigate("/courses");
    } else {
      alert("failed to update");
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      setCourseDetail((prev)=>{
        return {...prev, isCourseLoading:true}
      })
      const res = await axios.get(BASE_URL + `/courses/${courseId}`);
      setCourseData(res.data.course);
      setCourseDetail((prev)=>{
        return {...prev, isCourseLoading:false}
      })
    };
    fetchCourse();
  }, [courseId]);

  if (isUserLoading || isCourseLoading) {
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
          //   marginTop:'50px',
          //   marginBottom:'50px'
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
            width={500}
            alignSelf="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton color="primary" size="large">
                <SchoolIcon sx={{ fontSize: "36px" }} />
              </IconButton>
              <Typography variant="h5" align="center">
                Update the course
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
                label="Title"
                fullWidth
                size="small"
                variant="outlined"
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                placeholder="Enter Title"
              ></TextField>
              <TextField
                required
                variant="outlined"
                label="Description"
                fullWidth
                size="small"
                rows={3}
                multiline
                type="text"
                name="description"
                value={courseData.description}
                onChange={handleChange}
                placeholder="Enter Description"
              ></TextField>
              <TextField
                required
                variant="outlined"
                label="Image URL"
                fullWidth
                size="small"
                type="url"
                name="imagelink"
                value={courseData.imagelink}
                onChange={handleChange}
                placeholder="Enter Image URL"
              ></TextField>
              <TextField
                required
                variant="outlined"
                label="Price"
                fullWidth
                size="small"
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleChange}
                placeholder="Enter Course Price"
              ></TextField>
              <TextField
                required
                select
                size="small"
                variant="outlined"
                label="Is Published"
                name="published"
                value={courseData.published}
                onChange={handleChange}
                fullWidth
                placeholder="Select published status"
              >
                <MenuItem key="true" value="true">
                  True
                </MenuItem>
                <MenuItem key="false" value="false">
                  False
                </MenuItem>
              </TextField>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={handleUpdateCourseClick}
              >
                Update Course
              </Button>
            </Box>
          </Box>
        </CssBaseline>
      </Container>
    </>
  );
};

export default UpdateCourse;
