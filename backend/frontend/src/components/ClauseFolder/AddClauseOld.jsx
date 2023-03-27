import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import TextEditor from "./TextEditor";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const AddClauseOld = () => {
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(age);
  };
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Typography
          variant="h4"
          style={{ fontWeight: "bolder", marginBottom: "3%" }}
        >
          Add Clause
        </Typography>
        <Typography
          variant="h6"
          style={{ fontWeight: "bolder", marginBottom: "1%" }}
        >
          Clause Title *
        </Typography>
        <TextField
          label="Title..."
          variant="outlined"
          size="small"
          style={{ marginBottom: "3%" }}
        />
        <Typography
          variant="h6"
          style={{ fontWeight: "bolder", marginBottom: "1%" }}
        >
          Used For
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Dropdown</InputLabel>
              <Select value={age} label="Select.." onChange={handleChange}>
                <MenuItem value={"Contract"}>Contract</MenuItem>
                <MenuItem value={"Appointment"}>Appointment</MenuItem>
                <MenuItem value={"Letter"}>Letter</MenuItem>
                <MenuItem value={"legal document"}>legal document</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          style={{ fontWeight: "bolder", marginBottom: "1%", marginTop: "3%" }}
        >
          Clauses Text*
        </Typography>
        <TextEditor />
        <div style={{ marginTop: "2%" }}>
          <Button variant="contained" style={{ marginRight: "1%" }}>
            <SaveIcon style={{ marginRight: "10%" }} />
            <Typography variant="h6">Save</Typography>
          </Button>
          <Button onClick={() => navigate("/FrontPage")} variant="outlined">
            <CancelIcon style={{ marginRight: "5%" }} />
            <Typography variant="h6">Cancel</Typography>
          </Button>
        </div>
      </div>
    </>
  );
};
export default AddClauseOld;
