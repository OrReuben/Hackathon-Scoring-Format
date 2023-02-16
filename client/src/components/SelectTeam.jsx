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
        <InputLabel id="demo-simple-select-label">Select Team And Project</InputLabel>
        <Select
        defaultValue={""}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTeam}
          label="Select Team And Project *"
          onChange={handleChange}
        >
          <MenuItem value={"Tennis - System / Shalem and Matan"}>
            Tennis - System : By Roy Shalem and Matan
          </MenuItem>
          {/* <MenuItem value={"ReferHer - Dashboard / Roi and Hila"}>
            ReferHer - Dashboard : By Roi and Hila
          </MenuItem> */}
          <MenuItem value={"Cyberillium - Crawler / Netanel and Asaf"}>
            Cyberillium - Crawler : By Netanel and Asaf
          </MenuItem>
          <MenuItem value={"Cyberillium - Dashboard / Omer and Omer Levy"}>
            Cyberillium - Dashboard : By Omer and Omer Levy
          </MenuItem>
          <MenuItem value={"ARDC - Resourced / Or and Ido"}>
            ARDC - Resourced : By Or and Ido
          </MenuItem>
          <MenuItem value={"ARDC - Chatbot / Omer and Mark"}>
            ARDC - Chatbot : By Omer and Mark
          </MenuItem>
          <MenuItem value={"Emotiplay / Itay and Ana"}>
            Emotiplay : By Itay and Ana
          </MenuItem>
          <MenuItem value={"Atidim - Data Panel / Adiv and Ravid"}>
            Atidim - Data Panel : By Adiv and Ravid
          </MenuItem>
          <MenuItem value={"Baggages / Rutzki and Tal"}>
            Baggages : By Roy Rutzki and Tal
          </MenuItem>
          <MenuItem value={"ReferHer - Application / Lisa, Roi and Hila"}>
            ReferHer - Application : By Lisa, Roi and Hila
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
