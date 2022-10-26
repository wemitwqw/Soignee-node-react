import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';

import LatestItemsHome from '../components/LatestItemsHome';

const theme = createTheme();

function makeDeleteRequest(itemId) {
  fetch('http://localhost:8081/api/items/delete/' + itemId, 
      { method: 'DELETE' }
  ).then(res => { 
      return res.json(); 
  }); 
}

function Home({myUserId}) {
  let navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState();

  function formSubmitHandler(e){
    e.preventDefault();
    navigate("/search/" + searchQuery, { replace: true });
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              soignée<br/>
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                ADJECTIVE<br/>
                dressed and groomed elegantly and with great care
            </Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={formSubmitHandler}
            >
              <TextField id="filled-basic" label="Search" variant="filled" onChange={e => setSearchQuery(e.target.value)}/>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          <LatestItemsHome onDeleteItem={makeDeleteRequest} myUserId={myUserId}/>
        </Container>
    </ThemeProvider>
  );
}

export default Home;