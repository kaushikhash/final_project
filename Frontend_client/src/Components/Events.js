import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import iguana from '../Assets/iguanaaa.jpg'
const Events = () => {

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image={iguana}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Some random event
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to="/camera" state={{ event_id: 1 }}>
            Next Step
          </Link>
          {/* <Link to='/camera'>
            Register
          </Link> */}
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image={iguana}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Some random event
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to="/camera" state={{ event_id: 2 }}>
            Next Step
          </Link>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image={iguana}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Some random event
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to="/camera" state={{ event_id: 3 }}>
            Next Step
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
export default Events