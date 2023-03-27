import { Box, Stack } from "@mui/material";
import React, { useState, createContext, useContext } from "react";
import TerrainTwoToneIcon from "@mui/icons-material/TerrainTwoTone";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClause, setVariant } from "../redux/reducers/appReducer";

function CardTemplate({ id, index, cardImg, name, description, status, count, path, usedFor }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ClauseContext = createContext();

  return (
    <Grid item md={4} key={index}>
      <Card sx={{ minWidth: 250 }} >
        <CardActionArea onClick={() => {
          const payload = {
            id: id,
            name: name,
            description: description,
            usedFor: usedFor
          };
          if(path==='/Variant'){
            dispatch(setClause(payload));
            navigate(path);
          }
          else{
            dispatch(setVariant(payload));
            navigate(path);
          }
          
        }}>
          <CardMedia
            component="img"
            height="140"
            image={cardImg}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" align="center">
              {name?.length > 18 ? name.substring(0, 18) + "..." : name}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {description?.length > 20 ? description.substring(0, 20) + "..." : description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>

          <Button size="small" color="primary" display='flex' align="right" >
            {status}
          </Button>
          <Button size="small" color="primary" display='flex' align="right" >
            {path === '/Variant' ? "Variant" : "Version"} {count}
          </Button>
        </CardActions>
      </Card>
    </Grid>);
}

export default CardTemplate;
