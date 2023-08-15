import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "primary.dark",
          padding: "30px 0px",
          
        }}
      >
        <Typography variant="h6" component="p" align="center" color="white" sx={{"@media screen and (max-width:900px)": {
            fontSize: "32px",
          },}}>
          Course Selling App created using Reactjs/Typescript, MUI, and Recoil
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
