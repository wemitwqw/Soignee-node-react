import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Input } from '@mui/material';

function EditListingForm(props) {
    const [brandName, setBrandName] = useState();
    const [model, setModel] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    //const [userId, setUser] = useState(localStorage.id);    
    const [resultNotif, setResultNotif] = useState([]);

    const itemId = window.location.href.split('/edit/')[1];
    const [isLoading, setIsLoading] = useState(true);
    const [loadedItem, setLoadedItem] = useState();

    useEffect(() => {
        fetch('http://localhost:8081/api/items/single/' + itemId).then(res => { 
        return res.json(); 
        }).then(data => {
        //setLoadedItem(data);
        setBrandName(data[0]["brandName"])
        setModel(data[0]["model"])
        setDescription(data[0]["description"])
        setPrice(data[0]["price"])
        setIsLoading(false);
        });
    },[]);

    function formSubmitHandler(e){
        e.preventDefault();

        const itemSubmitted = {
            "brandName": brandName,
            "model": model,
            "description": description,
            "price": price
        }
        
        fetch('http://localhost:8081/api/items/update/' + itemId, {
        method: 'PUT',
        body: JSON.stringify(itemSubmitted),
        headers: {'Content-Type':'application/json'}
        }).then(res => { 
        if(res.status===200){
            setResultNotif('Successfully updated the listing!');
        }
        return res.json(); 
        });
        
        setTimeout(function() {
            window.location.reload(1);
        }, 3000);
    }

    if (isLoading) {
        return (<div>Loading...</div>);
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
          <Typography component="h1" variant="h5">Edit Listing</Typography>
          <Box sx={{ mt: 3 }}>
            {resultNotif}
          </Box>
          <Box component="form" onSubmit={formSubmitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              defaultValue={brandName}
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
              defaultValue={model}
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
              defaultValue={description}
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
              defaultValue={price}
              margin="normal"
              required
              fullWidth
              type="number"
              name="price"
              label="Price"
              id="price"
              onChange={e => setPrice(e.target.value)}
            />    
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit Listing
            </Button>
          </Box>
        </Box>
    )
}

export default EditListingForm;