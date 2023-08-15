import SchoolIcon from "@mui/icons-material/School";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  IconButton,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, MouseEvent,useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, courseState, parseToken, userState } from "../state/atoms/adminatom";
import { useRecoilState, useRecoilValue } from "recoil";
import Loader from "./Loader";

const CreateCourse = () => {
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState({title:"", description:"",price:"", imagelink:"", published:false})
  const token = parseToken();
  const [{isCourseLoading}, setCourseDetail] = useRecoilState(courseState);
  const {isUserLoading}  = useRecoilValue(userState)

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target;
    setCourseData((prev)=>{
      return {...prev, [name]:value}
    })
  }

  const handleCreateCourseClick = async (e:MouseEvent<HTMLElement>)=>{
    e.preventDefault();
    axios.defaults.headers.common['bearertoken'] = token;
    setCourseDetail((prev)=>{
      return {...prev, isCourseLoading:true}
    })
    const res = await axios.post(BASE_URL + '/courses', courseData)
    setCourseDetail((prev)=>{
      return {...prev, isCourseLoading:false}
    })
    setCourseData({title:"", description:"",price:"", imagelink:"", published:false})
    if(res.data.msg !== ''){
      alert(res.data.msg)
    }
    navigate('/courses')
  }

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
                Create a New Course
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
              <Button type="button" variant="contained" fullWidth onClick={handleCreateCourseClick}>
                Create Course
              </Button>
            </Box>
          </Box>
        </CssBaseline>
      </Container>
    </>
  );
};

export default CreateCourse;
