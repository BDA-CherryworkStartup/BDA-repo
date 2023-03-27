import { Box, Stack } from "@mui/material";

import TerrainTwoToneIcon from "@mui/icons-material/TerrainTwoTone";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

function CardTemplate(props) {
    
    const cardValue = props.cardData;
    const navigate = useNavigate();
  
  return (
    <Grid container spacing={1} ml={1} mt={3} mb={4}>
      {cardValue.map((ele, index) => (
        <Grid item md={4} key={index}>
          <Card sx={{ maxWidth: 270 }} >
            <CardActionArea onClick={()=> {navigate(cardValue[0].openBtnLink)
          }}>
              <CardMedia
                component="img"
                height="140"
                image={ele.cardImg}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align="center">
                  {ele.cardName}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {ele.cardDesc}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            
              <Button size="small" color="primary" display='flex'  align="right" >
                {ele.cardButton1}
              </Button>
              <Button size="small" color="primary" display='flex'  align="right" >
                {ele.cardButton2}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CardTemplate;
