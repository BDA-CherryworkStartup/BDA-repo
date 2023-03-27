import React from "react";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Stack, Button, Grid, IconButton, Box } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CardTemplate from "../components/CardTemplates";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Container from "@mui/material/Container";
import Item from "@mui/material/ListItem";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Variant = (props) => {
  
  const[open,setOpen]=useState(false);
  const navigate = useNavigate();

  const cardValue = [{
    cardImg: "https://w10.naukri.com/mailers/2022/naukri-learning/what-is/What-is-Finance.jpg",
    cardName: "Finance ",
    
    cardButton1: "Status",
    cardButton2: "Versions : ",
    openBtnLink: "/Versions",

  },
  {
    cardImg: "https://cdn.corporatefinanceinstitute.com/assets/finance-definition.jpg",
    cardName: "Finance V1",
    
    cardButton1: "Status",
    cardButton2: "Versions : ",
    openBtnLink: "/Versions",

  },
  {
    cardImg: "https://asapkerala.gov.in/wp-content/uploads/2021/10/Diploma-in-Banking-Finance.jpg",
    cardName: "Finance V2",
    
    cardButton1: "Status",
    cardButton2: "Versions : ",
    openBtnLink: "/Versions",

  },
  {
    cardImg: "https://asapkerala.gov.in/wp-content/uploads/2022/03/fianace.jpg",
    cardName: "Finance V3",
    
    cardButton1: "Status",
    cardButton2: "Versions : ",
    openBtnLink: "/Versions",

  },
  {
    cardImg: "https://s40424.pcdn.co/in/wp-content/uploads/2022/03/What-is-Financial-Management.jpg",
    cardName: "Finance V4",
    
    cardButton1: "Status",
    cardButton2: "Versions : ",
    openBtnLink: "/Versions",

  },
  {
    cardImg: "https://thederivativ.com/wp-content/uploads/2022/03/illustration-financial-concept_53876-37658.jpg",
    cardName: "Finance V5",
    
    cardButton1: "Status",
    cardButton2: "Versions : ",
    openBtnLink: "/Versions",

  }];
  const cname="Financial Services";
  const usedF="Finance, Accounts";
  const desc="finance, the process of raising funds or capital for any kind of expenditure. Consumers, business firms, and governments often do not have the funds available to make expenditures, pay their debts, or complete other transactions and must borrow or sell equity to obtain the money they need to conduct their operations.";
  return (

    <Container fixed >
      <Grid container  spacing={7}>
        <Grid item xs={6} md={12}>
          <Stack alignItems="center">
            <Stack
              direction="row"
              paddingRight={10}
              justifyContent="space-evenly"
              mt="0rem"
              width="60vw"
            >
              <Typography style={{marginTop:"0%",marginRight:"2%",fontWeight:"bolder",color:"darkgreen",fontSize:"30px"}}>
                Variants
                </Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="search"
                sx={{ width: "25rem",  ".MuiOutlinedInput-root" : {
                  borderRadius: "5rem"
                } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {!open && <Button
                variant="contained"
                size="small"
                sx={{ background: "black", borderRadius: "1rem" }}
                onClick={ () => navigate("/AddVariant")}
              >
                <AddOutlinedIcon />
              </Button>}
              
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Grid container ml={11} mt={2}>
      <Grid container mt={2} mb={2}>
        <Grid item xs={9} sm={6} md={4} >
                <Typography variant="h6" style={{fontWeight:"bolder"}}>
                  Clause Name:     <span style={{fontWeight:"normal"}}>{cname}</span>
                </Typography>
        </Grid>
        <Grid item xs={9} sm={6} md={3}>
                <Typography variant="h6" style={{fontWeight:"bolder"}}>
                  Used For:     <span style={{fontWeight:"normal"}}>{usedF}</span>
                </Typography>
      </Grid>
      </Grid>
      <Grid style= {{display: "flex", gap: "1rem"}} mb={3}>
        <Typography variant="h6" style={{fontWeight:"bolder"}}>Description:</Typography>
        <Typography style={{fontWeight:"normal", textAlign: "justify"}} mr={25}>{desc}</Typography>
      </Grid>
      
      <Grid container  mt={2} >
        <Grid item xs={6} md={10} >
          <AwesomeSlider> 
          {[...Array(2)].map((ele, index) => (
            <div key={index}>
              <CardTemplate cardData={cardValue} />
            </div>
            ))}
          </AwesomeSlider>
        </Grid>
      </Grid>
      </Grid>
      
    </Container>
  );
};

export default Variant;
