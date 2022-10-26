import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Input } from '@mui/material';

function AddListingForm(props) {
    const [brandName, setBrandName] = useState();
    const [model, setModel] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [photos, setPhotos] = useState();
    const [userId, setUser] = useState(localStorage.id);    

    function formSubmitHandler(e){
        e.preventDefault();
        
        const file = document.querySelector("input[type=file]").files[0];
        const item = new FormData();
        item.append("brandName", brandName);
        item.append("model", model);
        item.append("quality", 10);
        item.append("description", description);
        item.append("file", file);
        item.append("price", price);
        item.append("user", userId);

        // const item = {
        //     "brandName": brandName,
        //     "model": model,
        //     "quality": 10,
        //     "description": description,
        //     "file": photos,
        //     "price": price,
        //     "user": userId
        // }
        
        props.onAddItem(item);
    }

    return(
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >        
          <Typography component="h1" variant="h5">Add New Listing</Typography>
          <Box sx={{ mt: 3 }}>
            {props.resultNotif}
          </Box>
          <Box component="form" onSubmit={formSubmitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="listing"
              label="Brand name"
              name="listing"
              autoFocus
              onChange={e => setBrandName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="listing"
              label="Item model"
              name="listing"
              autoFocus
              onChange={e => setModel(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              minRows={3}
              name="description"
              label="Description"
              id="description"
              onChange={e => setDescription(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              name="price"
              label="Price"
              id="price"
              onChange={e => setPrice(e.target.value)}
            />
            <Box
              fullWidth
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
                <Input required accept="image/*" id="upload-photos" multiple type="file" name='upload-photos' sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                margin: ' 20px auto 0',
                cursor: 'pointer',
                }}
                onChange={e => setPhotos(e.target.value.replace(/^.*[\\\/]/, ''))}
                />

              {/* <Box 
                sx={{
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                  Photo-carousel
              </Box> */}
            </Box>      
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Listing
            </Button> */}
          </Box>
        </Box>
    )
}

export default AddListingForm;