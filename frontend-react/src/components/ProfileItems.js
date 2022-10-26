import React from "react";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material';

function makeDeleteRequest(itemId) {
  fetch('http://localhost:8081/api/items/delete/' + itemId, 
      { method: 'DELETE' }
  ).then(res => { 
      window.location.reload(true)
      return res.json(); 
  }); 
}

function ProfileItems({loadedItems, myUserId}) {
  
  return (        
      <Grid container spacing={4}>
        {loadedItems.length>0 ? 
          loadedItems.map(({brandName, model, _id, price, photo, user }) => (
          <Grid item key={_id} xs={12} sm={6} md={4}>
              <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
              <CardActionArea component={Link} to={{ pathname: '/item/' + _id }} >
                  <CardMedia
                  // style = {{ height: 400, paddingTop: '0%'}}
                  component="img"
                  sx={{
                      // 16:9
                      pt: '0%',
                  }}
                  height="200"
                  margin="auto"
                  image={`http://localhost:8081/api/image/${photo}`}
                  alt="image"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                          {model}
                      </Typography>
                      <Grid>
                          <Typography>
                              {brandName}
                          </Typography>
                          <Typography>
                              {price+'€'}
                          </Typography>
                      </Grid>
                  </CardContent>
              </CardActionArea>
              { myUserId === user && 
                <CardActions>
                    <Button size="small" component={Link} to={{ pathname: '/item/edit/' + _id }}>Edit</Button>
                    {/* <Button size="small" component={Link} to={{ pathname: '/item/delete/' + _id }}>Delete</Button> */}
                    <Button size="small" onClick={() => makeDeleteRequest(_id)}>Delete</Button>
                </CardActions>
                }
              </Card>
          </Grid>
          )) :
          <Container sx={{ py: 2 }} maxWidth="md">
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              User has no added listings!
            </Box>
          </Container>
        }
      </Grid>
  );
}

export default ProfileItems;
