import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const styles = {
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  };

function SearchResult({filter}) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);

    useEffect(() => {
    fetch('http://localhost:8081/api/items/search/' + filter).then(res => { 
    return res.json(); 
    }).then(data => {
    setIsLoading(false);
    setLoadedItems(data);
    });
    },[])
    
    if (isLoading) {
        return (<div>Loading...</div>);
    }
    
    return (        
        <Grid container spacing={4}>
            {loadedItems.map(({brandName, model, _id, price, photo}) => (
            <Grid item key={_id} xs={12} sm={6} md={4}>
                <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <CardActionArea component={Link} to={{ pathname: '/item/' + _id }} >
                    <CardMedia
                    component="img"
                    sx={{
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
                <CardActions>
                    <Button size="small" component={Link} to={{ pathname: '/item/edit/' + _id }}>Edit</Button>
                    <Button size="small" component={Link} to={{ pathname: '/item/delete/' + _id }}>Delete</Button>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
    )
}

export default SearchResult