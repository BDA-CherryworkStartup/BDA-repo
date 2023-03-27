import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Stack, Button, Grid, IconButton, Box } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CardTemplate from "../CardTemplates";
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
import { useSelector } from "react-redux";
import axios from "axios";


const Variant = (props) => {
  const state = useSelector(state => state.appReducer).clause;
  const [open, setOpen] = useState(false);
  const [variantData, setVariantData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/clause/${state.id}`)
      .then(function (response) {
        console.log(response);
        setVariantData(response.data.variantResults);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container fixed >
      <Grid container spacing={7}>
        <Grid item xs={6} md={12}>
          <Stack alignItems="center">
            <Stack
              direction="row"
              paddingRight={10}
              justifyContent="space-evenly"
              mt="0rem"
              width="60vw"
            >
              <Typography style={{ marginTop: "0%", marginRight: "2%", fontWeight: "bolder", color: "darkgreen", fontSize: "30px" }}>
                Variants
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="search"
                sx={{
                  width: "25rem", ".MuiOutlinedInput-root": {
                    borderRadius: "5rem"
                  }
                }}
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
                onClick={() => navigate("/AddVariant")}
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
            <Typography variant="h6" style={{ fontWeight: "bolder" }}>
              Clause Name:     <span style={{ fontWeight: "normal" }}>{state.name}</span>
            </Typography>
          </Grid>
          <Grid item xs={9} sm={6} md={3}>
            <Typography variant="h6" style={{ fontWeight: "bolder" }}>
              Used For:     <span style={{ fontWeight: "normal" }}>{state.usedFor}</span>
            </Typography>
          </Grid>
        </Grid>
        <Grid style={{ display: "flex", gap: "1rem" }} mb={3}>
          <Typography variant="h6" style={{ fontWeight: "bolder" }}>Description:</Typography>
          <Typography style={{ fontWeight: "normal", textAlign: "justify" }} mr={25}>{state.description}</Typography>
        </Grid>

        <Grid container mt={2} >
          <Grid item xs={6} md={10} >
          {[...Array(variantData.length / 3 >= 1 ? variantData.length / 3 : 1)].map((ele, index) => (
              <div key={index}>
                <Grid container spacing={1} ml={1} mt={3} mb={4}>
                  {variantData.map((data, id) => {
                    return <CardTemplate id={data.variantId} name={data.variantName} description={data.description} cardImg={data.image} index={id} status={data.status} count={data.versionCount} path={"/Version"} usedFor={data.usedFor} />
                  })}
                </Grid>
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>

    </Container>
  );
};

export default Variant;
