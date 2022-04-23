import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function TestCard(props) {
  const getImage = () => {
    if(props.title === 'HTML'){
      return "/Image/html/icons8-html-5-150.svg"
    }
    return "/Image/html/icons8-html-5-150.svg"
  }
  const {title, level} = props
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="220"
        image={getImage()}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {level} 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Начать</Button>
      </CardActions>
    </Card>
  );
}