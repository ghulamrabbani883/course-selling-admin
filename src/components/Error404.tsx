import { Box, Container, CssBaseline, Typography } from '@mui/material'

const Error404 = () => {
  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Container sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>
            <Box sx={{height:'300px', width:'90%', boxShadow:'red'}} >
                <Typography variant='h5'>404 No page found</Typography>
            </Box>
        </Container>
      </Container>
    </CssBaseline>
  )
}

export default Error404
