import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TextEditor from "./TextEditor";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function AddClause() {
  const [personName, setPersonName] = React.useState([]);
  const [clauseContent, setClauseContent] = React.useState();
  const [clauseName, setClauseName] = React.useState();
  const [usedFor, setUsedFor] = React.useState([]);
  const [addUsedFor, setAddUsedFor] = React.useState();
  const [usedForList, setUsedForList] = React.useState([]);
  const [addSignature, setAddSignature] = React.useState(false);
  const [addSignatureContent, setAddSignatureContent] = React.useState();
  const [signers, setSigners] = React.useState([]);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeUsedFor = (event) => {
    const {
      target: { value },
    } = event;
    setUsedFor(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const addClause = (event) => {
    const payload = {
      name: clauseName,
      content: clauseContent.content,
      usedFor: usedFor,
      signature: personName
    };
    console.log("Testing Payload", payload)
    axios.post("http://localhost:5000/api/clause", payload).then((response)=>{
      console.log(response);
    }).catch((err)=>{
      console.log(err);
    })
    navigate('/')
  }


  return (
    <Stack sx={{ height: "98vh", width: "98vw" }} direction="row">
      <Stack sx={{ height: "95vh", width: "78vw" }}>
        <Box
          sx={{
            height: "8vh",
            width: "76vw",
            background: "#C9EEFF",
            display: "flex",
            padding: "1rem",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Grid
            container
            alignItems={"center"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            <Grid item xs={3} sm={1} md={1}>
              <SettingsOutlinedIcon
                sx={{ width: "4rem", height: "3.5rem", paddingLeft: "5rem" }}
              />
            </Grid>
            <Grid item xs={3} sm={3} md={7}>
              <h1>Add Clause</h1>
            </Grid>
            <Grid item xs={2} sm={3} md={2}>
              <Button variant="contained" style={{ marginRight: "1%" }} onClick={addClause}>
                <SaveIcon style={{ marginRight: "10%" }} />
                <Typography variant="h6">Save</Typography>
              </Button>
            </Grid>
            <Grid item xs={2} sm={3} md={2}>
              <Button onClick={() => navigate("/FrontPage")} variant="outlined">
                <CancelIcon style={{ marginRight: "5%" }} />
                <Typography variant="h6">Cancel</Typography>
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              width: "37vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          ></Box>
        </Box>
        <Stack height="70vh" width="78vw">
          <Box mt={4} style={{ display: "flex", gap: "4rem" }}>
            <Grid style={{ display: "flex", gap: "1rem" }} mb={3}>
              <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                Clause Title
              </Typography>
              <Typography variant="h5" style={{ color: "red" }}>
                *
              </Typography>
              <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                :
              </Typography>

              <TextField
                onChange={(e) =>
                  setClauseName(e.target.value)
                }
                value={clauseName}
                variant="outlined"
                size="large"
                sx={{
                  width: "15rem",
                  ".MuiOutlinedInput-input": {
                    height: "2rem",
                    fontSize: "1rem",
                  },
                }}
              />
            </Grid>
            <Grid style={{ display: "flex", gap: "1rem" }} mb={3}>
              <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                Used For
              </Typography>
              <Typography variant="h5" style={{ color: "red" }}>
                *
              </Typography>
              <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                :
              </Typography>

              <FormControl sx={{ width: 280 }}>
                <InputLabel
                  id="demo-multiple-checkbox-label"
                  style={{ marginTop: "3%" }}
                >
                  Used For
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  style={{ height: "10vh" }}
                  multiple
                  value={usedFor}
                  onChange={handleChangeUsedFor}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  <input type="" value={addUsedFor} onChange={(e) => {
                    setAddUsedFor(e.target.value)
                  }} onKeyDown = {(e) => {
                    if(e.key==='Enter'){
                      setUsedForList([...usedForList, addUsedFor])
                      setAddUsedFor("");
                    }
                  }}/>
                  {usedForList.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={usedFor.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Box>
          <Box
            mt={3}
            sx={{
              display: "flex",
              alignItems: "start",
              width: "152vw",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <Grid style={{ display: "flex", gap: "1rem" }} mb={3}>
              <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                Clause Text
              </Typography>
              <Typography variant="h5" style={{ color: "red" }}>
                *
              </Typography>
            </Grid>
            <TextEditor
              width="78vw"
              onChange={setClauseContent}
            />
          </Box>
          {!addSignature ? (
            <span></span>
          ) : (
            <>
              <Typography
                style={{
                  backgroundColor: "lightgrey",
                  fontWeight: "bolder",
                  fontSize: "150%",
                  textAlign: "center",
                  marginBottom: "5%",
                }}
              >
                Signatures
              </Typography>
              <Grid container>
                {personName.map((id) => {
                  console.log(personName);
                  return (
                    <Grid item xs={6} sm={6} md={6} mt={5} mb={5}>
                      <Typography
                        style={{ fontSize: "120%", textAlign: "center" }}
                      >
                        {id}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </Stack>
      </Stack>
      <Stack
        sx={{ height: "95vh", width: "20vw", border: "1px solid black" }}
        alignItems="center"
      >
        {!addSignature ? (
          <Button
            variant="contained"
            style={{ marginTop: "10%" }}
            onClick={() => setAddSignature(true)}
          >
            ADD SIGNATURE
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              style={{ backgroundColor: "red", marginTop: "10%" }}
              onClick={() => {
                setAddSignature(false);
                setPersonName([]);
              }}
            >
              X
            </Button>
            <Typography
              style={{
                fontWeight: "bolder",
                fontSize: "150%",
                marginTop: "10%",
              }}
            >
              Signatures
            </Typography>
            <FormControl sx={{ m: 1, width: 280 }}>
              <InputLabel
                id="demo-multiple-checkbox-label"
                style={{ marginTop: "3%" }}
              >
                Signers
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                style={{ height: "10vh" }}
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                <input type="" value={addSignatureContent} onChange={(e) => {
                    setAddSignatureContent(e.target.value)
                  }} onKeyDown = {(e) => {
                    if(e.key==='Enter'){
                      setSigners([...signers, addSignatureContent])
                      setAddSignatureContent("");
                    }
                  }}/>
                  {signers.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default AddClause;
