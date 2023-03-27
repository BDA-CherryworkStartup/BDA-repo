import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
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
  const [addSignature, setAddSignature] = React.useState(false);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [versionList, setVersionList] = useState([
    {
      title: "List Item 1",
      usedFor: "Contract",
      text: "List Item clause text 1",
    },
    {
      title: "List Item 2",
      usedFor: "Letter",
      text: "List Item clause text 2",
    },
    {
      title: "List Item 3",
      usedFor: "Appointment",
      text: "List Item clause text 3",
    },
    {
      title: "List Item 4",
      usedFor: "Legal Document",
      text: "List Item clause text 4",
    },
    {
      title: "List Item 5",
      usedFor: "Contract",
      text: "List Item clause text 5",
    },
    {
      title: "List Item 6",
      usedFor: "Legal Document",
      text: "List Item clause text 6",
    },
  ]);
  const [selectedList, setSelectedList] = useState(versionList[0]);
  const handleSelectedData = () => {
    let data = versionList;
    data.unshift(selectedList);
    setSelectedList(versionList[0]);
    setVersionList(data);
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
  const Signers = [
    "External Guest",
    "Anyone",
    "Any External Guest",
    "Any Internal User",
    "You",
  ];
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
                    setSelectedList(versionList[0]);
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
                  setSelectedList({ ...selectedList, title: e.target.value })
                }
                disabled={!isEditable}
                value={selectedList.title}
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
                  {Signers.map((name) => (
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
              text={selectedList.text}
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
          {versionList.map((ele, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setSelectedList(ele);
              }}
              selected={ele.title === selectedList.title}
            >
              <ListItemText primary={ele.title} />
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
                  {Signers.map((name) => (
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
