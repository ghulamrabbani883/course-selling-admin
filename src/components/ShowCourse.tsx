import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, CourseType, courseState, parseToken, userState } from "../state/atoms/adminatom";
import { useRecoilState, useRecoilValue } from "recoil";
import Loader from "./Loader";

const ShowCourse = () => {
  const [{allCourse, isCourseLoading}, setCourseData] = useRecoilState(courseState);
  const {isUserLoading} = useRecoilValue(userState)
  console.log(isCourseLoading, isUserLoading)

  const token = parseToken();

  const deleteCourse = async (courseId: number) => {
    setCourseData((prev)=>{
      return {...prev, isCourseLoading:true}
    })
    axios.defaults.headers.common["bearertoken"] = token;
    const res = await axios.delete(BASE_URL + `/courses/${courseId}`);
    if (res.data.msg !== "") {
      setCourseData((prev)=>{
        return {...prev, isCourseLoading:false}
      })
      alert("row deleted" + JSON.stringify(res.data.deletedRows));
    }
    window.location.reload();
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setCourseData((prev)=>{
        return {...prev, isCourseLoading:true}
      })
      axios.defaults.headers.common["bearertoken"] = token;
      const res = await axios.get(BASE_URL + `/courses/`);
      console.log(res.data);
      setCourseData((prev)=>{
        return {...prev, allCourse:res.data.courses}
      });
      setCourseData((prev)=>{
        return {...prev, isCourseLoading:false}
      })
    };
    fetchCourses();
  }, []);

  if(isUserLoading || isCourseLoading){
    return <Loader />
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
          paddingLeft: "100px",
          paddingRight: "100px",
          paddingBottom: "50px",
          "@media screen and (max-width: 600px)": {
            paddingLeft: "50px",
            paddingRight: "50px",
          },
          "@media screen and (max-width: 400px)": {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
        }}
      >
        <CssBaseline>
          <Typography
            variant="h3"
            component={"div"}
            padding={"50px 0px"}
            align="center"
          >
            All Courses
          </Typography>
          <Container maxWidth="lg">
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              {allCourse.length === 0 ? (
                <Box>
                  <Typography variant="h5">No course available yet</Typography>
                  <Link to="/about">
                    <Button variant="contained" color="primary">
                      Create New Course
                    </Button>
                  </Link>
                </Box>
              ) : (
                allCourse.map((course: CourseType) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={course.courseid}
                      // sx={{ flexGrow: 1 }}
                    >
                      <Card
                        variant="outlined"
                        sx={{ boxShadow: 3, padding: 1 }}
                      >
                        <CardMedia
                          sx={{ height: 140 }}
                          image={course.imagelink}
                          title={`${course.title}`}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {course.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {course.description}
                          </Typography>
                        </CardContent>
                        <CardActions
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Link to={`/courses/${course.courseid}`}>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                          >
                            Update
                          </Button>
                          </Link>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => deleteCourse(course.courseid)}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Container>
        </CssBaseline>
      </Container>
    </>
  );
};

export default ShowCourse;
