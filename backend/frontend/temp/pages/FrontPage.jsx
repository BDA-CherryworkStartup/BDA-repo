import React, { useEffect } from "react";
import { useState } from "react";
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
import axios from "axios";
const FrontPage = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clause")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const cardValue = [
    {
      cardImg:
        "https://www.betterplace.co.in/blog/wp-content/uploads/2022/04/SN21_HRMS-What-is-it-and-why-does-your-company-need-it.jpg",
      cardName: "HR",
      cardDesc: "Used For : ",
      
      cardButton1: "Status",
      cardButton2: "Variant : ",
      openBtnLink: "/Variant",
    },
    {
      cardImg:
        "https://www.northeastern.edu/bachelors-completion/wp-content/uploads/2019/09/Accountant-Hero-1.jpg",
      cardName: "Accountant",
      cardDesc: "Used For : ",
      
      cardButton1: "Status",
      cardButton2: "Variant : ",
      openBtnLink: "/Variant",
    },
    {
      cardImg:
        "https://s40424.pcdn.co/in/wp-content/uploads/2022/03/What-is-Financial-Management.jpg",
      cardName: "Finance",
      cardDesc: "Used For : ",
      
      cardButton1: "Status",
      cardButton2: "Variant : ",
      openBtnLink: "/Variant",
    },
    {
      cardImg:
        "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/06/WordPress-Admin-Password.png",
      cardName: "Admin",
      cardDesc: "Used For : ",
      
      cardButton1: "Status",
      cardButton2: "Variant : ",
      openBtnLink: "/Variant",
    },
    {
      cardImg:
        "https://blog.ipleaders.in/wp-content/uploads/2021/08/law-firm-1.jpg",
      cardName: "Legal",
      cardDesc: "Used For : ",
      
      cardButton1: "Status",
      cardButton2: "Variant : ",
      openBtnLink: "/Variant",
    },
    {
      cardImg:
        "https://blog.ipleaders.in/wp-content/uploads/2022/02/contract.jpg",
      cardName: "Contract",
      cardDesc: "Used For : ",
      
      cardButton1: "Status",
      cardButton2: "Variant : ",
      openBtnLink: "/Variant",
    },
  ];

  return (
    <Container fixed>
      <Grid container spacing={7}>
        <Grid item xs={6} md={12} >
          <Stack alignItems="center">
            <Stack
              direction="row"
              paddingRight={10}
              justifyContent="space-between"
              mt="0rem"
              width="60vw"
            >
              <Typography style={{marginTop:"1%",marginRight:"2%",fontWeight:"bolder",color:"darkgreen",fontSize:"30px"}}>
                Clause Library
                </Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="search"
                sx={{
                  width: "25rem",
                  ".MuiOutlinedInput-root": {
                    borderRadius: "5rem",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {!open && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ background: "black", borderRadius: "1rem" }}
                  onClick={() => navigate("/AddClause")}
                >
                  <AddOutlinedIcon />
                </Button>
              )}
              {!open && (
                <Button
                  variant="contained"
                  sx={{ background: "black", borderRadius: "2rem" }}
                >
                  Upload
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Grid container mt={1} ml={10}>
        <Grid item xs={6} md={10}>
          <AwesomeSlider>
            {[...Array(2)].map((ele, index) => (
              <div key={index}>
                <CardTemplate cardData={cardValue} />
              </div>
            ))}
          </AwesomeSlider>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FrontPage;
