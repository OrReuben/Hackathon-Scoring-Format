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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
            <MenuItem value={`Group ${number} / None`}>Group {number}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
