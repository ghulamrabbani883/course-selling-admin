import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Card,
  CardMedia,
  CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <>
      <CssBaseline>
        <Container maxWidth="xl" sx={{ minHeight: "90vh" }}>
          <Box
            component="div"
            sx={{
              margin: "50px 70px",
              "@media screen and (max-width: 650px)": {
                margin: "50px 30px",
              },
              "@media screen and (max-width: 450px)": {
                margin: "30px 10px",
              },
            }}
          >
            <Grid container spacing={10} alignItems="center">
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  variant="h3"
                  component="p"
                  color="inherit"
                  sx={{
                    marginBottom: "30px",
                    "@media screen and (max-width: 1150px)": {
                      fontSize: "32px",
                    },
                    "@media screen and (max-width: 900px)": {
                      fontSize: "42px",
                    },
                    "@media screen and (max-width: 650px)": {
                      fontSize: "32px",
                    },
                    "@media screen and (max-width: 450px)": {
                      fontSize: "26px",
                    },
                  }}
                >
                  Welcome to Admin Side of Course Selling Website
                </Typography>
                <Link to="/about">
                  <Button variant="contained" size="large">
                    Create Course
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Card>
                  <CardMedia
                    sx={{ height: 400, marginTop: 5 }}
                    image="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                    title="Course Selling"
                  />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </CssBaseline>
    </>
  );
};

export default Landing;
