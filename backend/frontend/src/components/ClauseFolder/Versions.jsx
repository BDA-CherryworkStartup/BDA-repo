import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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

function Versions() {
  const [isEditable, setEditable] = useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [usedFor, setUsedFor] = React.useState([]);
  const [addUsedFor, setAddUsedFor] = React.useState();
  const [addSignature, setAddSignature] = React.useState();
  const [addSignatureContent, setAddSignatureContent] = React.useState();
  const [versionData, setVersionData] = React.useState([]);
  const [signers, setSigners] = React.useState([]);
  const [usedForList, setUsedForList] = React.useState([]);
  const clauseState = useSelector(state => state.appReducer).clause;
  const variantState = useSelector(state => state.appReducer).variant;
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

  const [selectedList, setSelectedList] = useState({ name : '' , content : ''});
  const handleSelectedData = () => {
    let data = versionData;
    data.unshift(selectedList);
    setSelectedList(versionData[0]);
    setVersionData(data);
    setEditable(false);
  };
  const handleChangeUsed = (event) => {
    const {
      target: { value },
    } = event;
    setUsedFor(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // let signers = clauseState.usedFor;

  const updateVariant = (e) => {
    console.log("Testing", selectedList)
    const payload = {
      clauseId: clauseState.id,
      variantId: variantState.id,
      name: selectedList.name,
      content: selectedList.content,
      usedFor: usedFor,
      signature: personName
    };
    console.log("Testing Payload", payload)
    axios.post("http://localhost:5000/api/clause/updateVersion", payload).then((response)=>{
      console.log(response);
    }).catch((err)=>{
      console.log(err);
    })
    navigate('/')
  }


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/clause/${clauseState.id}/variant/${variantState.id}`)
      .then(function (response) {
        console.log(response);
        setVersionData(response.data.versionResult);
        setSelectedList(response.data.versionResult[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
      setUsedForList(clauseState.usedFor)
  }, [])

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
          <Box
            sx={{
              height: "5vh",
              width: "37vw",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SettingsOutlinedIcon
              sx={{ width: "4rem", height: "3.5rem", paddingLeft: "5rem" }}
            />
            <h1>Variant Editor</h1>
          </Box>
          <Box
            sx={{
              width: "37vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            {isEditable ? (
              <Box
                sx={{
                  height: "4vh",
                  width: "20vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <IconButton onClick={() => handleSelectedData()}>
                  <CheckIcon
                    sx={{ color: "green", width: "3rem", height: "4rem" }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEditable(false);
                    setSelectedList(versionData[0]);
                  }}
                >
                  <CloseIcon
                    sx={{ color: "red", width: "3rem", height: "4rem" }}
                  />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => setEditable(true)}
                size="medium"
                sx={{ marginRight: "8rem" }}
              >
                <ModeEditIcon
                  sx={{ color: "blue", width: "3rem", height: "4rem" }}
                />
              </IconButton>
            )}
          </Box>
        </Box>
        <Stack height="70vh" width="78vw">
          <Box mt={4} style={{ display: "flex", gap: "4rem" }}>
            <Grid style={{ display: "flex", gap: "1rem" }} mb={3}>
              <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                Version Title
              </Typography>
              <Typography variant="h5" style={{ color: "red" }}>
                *
              </Typography>
              <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                :
              </Typography>

              <TextField
                onChange={(e) =>
                  setSelectedList({ ...selectedList, name: e.target.value })
                }
                disabled={!isEditable}
                value={selectedList?.name}
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
                <InputLabel id="demo-multiple-checkbox-label">
                  Used For
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  style={{ height: "9vh" }}
                  multiple
                  value={usedFor}
                  onChange={handleChangeUsed}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  disabled={!isEditable}
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
                Version Text
              </Typography>
              <Typography variant="h5" style={{ color: "red" }}>
                *
              </Typography>
            </Grid>
            <TextEditor
              text={selectedList.content}
              width="78vw"
              onChange={setSelectedList}
            />
          </Box>
          {!addSignature ? (
            <span></span>
          ) : (
            <Typography
              style={{
                backgroundColor: "lightgrey",
                fontWeight: "bolder",
                fontSize: "150%",
                textAlign: "center",
                marginBottom: "5%",
                marginTop: "1%",
              }}
            >
              Signatures
            </Typography>
          )}
          <Grid container>
            {personName.map((id) => {
              console.log(personName);
              return (
                <Grid item xs={6} sm={6} md={6} mt={5} mb={5}>
                  <Typography style={{ fontSize: "120%", textAlign: "center" }}>
                    {id}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          <Button color="primary" fullWidth="false" onClick={updateVariant}>Update</Button>
        </Stack>
      </Stack>
      <Stack
        sx={{ height: "95vh", width: "20vw", border: "1px solid black" }}
        alignItems="center"
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Versions Index
            </span>
          }
        >
          {versionData.map((ele, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                console.log(ele);
                if(ele?.signature!=null){
                  setAddSignature(true)
                } 
                if(ele?.usedFor!=null){
                  setUsedForList(ele.usedFor)
                }
                setSelectedList(ele);
                setSigners(ele?.signature);
                setPersonName(ele?.signature)
              }}
              selected={ele?.name === selectedList?.name}
            >
              <ListItemText primary={ele?.name} />
            </MenuItem>
          ))}
        </List>
        <Grid ml={2}>
          {!addSignature ? (
            <Button
              variant="contained"
              style={{ marginTop: "10%" }}
              onClick={() => setAddSignature(true)}
              disabled={!isEditable}
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
              <Typography variant="h5" style={{ fontWeight: "bolder" }} mb={2}>
                Signatures
              </Typography>
              <FormControl sx={{ m: 1, width: 280 }}>
                <InputLabel
                  id="demo-multiple-checkbox-label"
                  style={{ marginTop: "3%" }}
                >
                  signers
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
        </Grid>
      </Stack>
    </Stack>
  );
}

export default Versions;
