import React, { useEffect } from "react";
import { useState } from "react";
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
import axios from "axios";
const FrontPage = (props) => {
  const [open, setOpen] = useState(false);
  const [clauseData, setClauseData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clause")
      .then(function (response) {
        setClauseData(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
              <Typography style={{ marginTop: "1%", marginRight: "2%", fontWeight: "bolder", color: "darkgreen", fontSize: "30px" }}>
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
          <AwesomeSlider bullets={false}>
            {[...Array(Math.ceil(clauseData.length / 3))].map((ele, index) => (
              <div>
                <Grid container spacing={1} ml={1} mt={3} mb={4}>
                  {clauseData.map((data, id) => {
                    return <CardTemplate id={data.id} name={data.name} description={data.description} cardImg={data.image} index={id} status={data.status} count={data.variantCount} path={"/Variant"} usedFor={data.usedFor} />
                  })}
                </Grid>
              </div>
            ))}
          </AwesomeSlider>
          {/* <div style={{ width: "33.33%", margin: "0 auto" }}>
            <AwesomeSlider bullets={false}>
              {clauseData.map((data, id) => {
                return (
                  <div key={data.id}>
                    <CardTemplate id={data.id} name={data.name} description={data.description} cardImg={data.image} index={id} status={data.status} count={data.variantCount} path={"/Variant"} usedFor={data.usedFor} />
                  </div>
                )
              })}
            </AwesomeSlider>
          </div> */}
      </Grid>
    </Container>
  );
};

export default FrontPage;
