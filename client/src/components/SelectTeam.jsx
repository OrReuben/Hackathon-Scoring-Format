import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectTeam({
  selectedTeam,
  setSelectedTeam,
  setSelectedContestants,
}) {
  const handleChange = async (event) => {
    setSelectedTeam(event.target.value.split("/")[0]);
    setSelectedContestants(event.target.value.split("/")[1]);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Select Team And Project
        </InputLabel>
        <Select
          defaultValue={""}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTeam}
          label="Select Team And Project *"
          onChange={handleChange}
        >
          <MenuItem value={"Farmer2Consumer / Kim and Lavi"}>
            Farmer2Consumer
          </MenuItem>
          <MenuItem value={"Environmental Volunteering / David and Amit"}>
            Environmental Volunteering
          </MenuItem>
          <MenuItem value={"Beach and forest cleaning / Gitam and Ran"}>
            Beach and forest cleaning
          </MenuItem>
          <MenuItem value={"MoveItOn / Nitai and Guy"}>MoveItOn</MenuItem>
          <MenuItem value={"Be Envioremently Better / Paz and Itay"}>
            Be Envioremently Better
          </MenuItem>
          <MenuItem value={"Envioremental Hazards / Sahar and Chen"}>
            Envioremental Hazards
          </MenuItem>
          <MenuItem value={"Envioremental Tips Forum / Shahar and Yoav"}>
            Envioremental Tips Forum
          </MenuItem>
          <MenuItem value={"Reverse Feedback / Lior and Avshalom"}>
            Reverse Feedback
          </MenuItem>
          <MenuItem value={"Quick Bin / Gil and Daniel"}>Quick Bin</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
