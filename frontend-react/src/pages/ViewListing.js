import React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';


const theme = createTheme();

function ViewListing({loginok}) {

  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedItem, setLoadedItem] = useState();

  useEffect(() => {
    fetch('http://localhost:8081/api/items/single/' + id).then(res => { 
    return res.json(); 
    }).then(data => {
    setLoadedItem(data);
    // console.log(data);
    setIsLoading(false);
    });
    },[]);

  if (!loginok) {
    return (
      <Navigate to="/login" />
    ) 
  }
  
  if (isLoading) {
      return (<div>Loading...</div>);
  }

  console.log(loadedItem);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{
          py: 2,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        maxWidth="md">
          <Box
          sx={{
            height: "350px",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            flex: "1 1 auto" 



          }}
        >
          <CardMedia 
              component="img"
              sx={{
                pt: '0%',
                display: "flex",
                height: "300px",
                width: "300px"

              }}

              margin="auto"
              image={`http://localhost:8081/api/image/${loadedItem[0]["photo"]}`}        
            />
          </Box>
          <Box
            sx={{
                display: "flex",
                flex: "1 0 auto",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}
        >
              <Typography sx={{ minHeight: "60px", fontWeight: "700"}} component="h2" variant="h2">
                  {loadedItem[0]["brandName"]} 
              </Typography>
              <Typography sx={{ minHeight: "60px", fontWeight: "700" }} component="h5" variant="h5">
                  Model: {loadedItem[0]["model"]}
              </Typography>
              <Typography sx={{ minHeight: "60px", fontWeight: "700"}} component="h5" variant="h5">
                  Price: {loadedItem[0]["price"]}€
              </Typography>
              <Typography sx={{ minHeight: "60px", fontWeight: "700"}} component="h5" variant="h5">
                  Description 
                  <Typography sx={{ fontSize: "1.5rem", p: "20px", fontWeight: "300"}} component="p" variant="p">
                  {loadedItem[0]["description"]}
                  </Typography>
              </Typography>
              <Typography sx={{ minHeight: "60px", fontWeight: "700"}} component="h5" variant="h5">
                  Posted at: 
                  <Typography sx={{ fontSize: "1.5rem", p: "20px", fontWeight: "300"}} component="p" variant="p">
                  {loadedItem[0]["createdAt"]}
                  </Typography>
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", p: "20px", fontWeight: "300"}} component="p" variant="p">
                  User: <Link to={`/profile/${loadedItem[0]["user"]}`}>{loadedItem[0]["user"]}</Link>
              </Typography> 
            </Box>
      </Container>
    </ThemeProvider>
  );
}


export default ViewListing;