import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TEAMS from "../constants/projectsAndTeams.json";
import { useEffect } from "react";
import { useSocket } from "../context/socketContext";

export default function SelectTeam({ register, user, watch, setValue }) {
  const value = watch("teamAndProject");
  const { socket, connected } = useSocket();

  useEffect(() => {
    if (!connected) return;

    const handleTeamChange = (newTeam) => {
      setValue("teamAndProject", newTeam);
    };

    const handleCurrentTeam = (currentTeam) => {
      setValue("teamAndProject", currentTeam);
    };

    socket.current.on("change-team", handleTeamChange);
    socket.current.on("current-team", handleCurrentTeam);

    return () => {
      socket.current.off("change-team", handleTeamChange);
      socket.current.off("current-team", handleCurrentTeam);
    };
  }, [connected]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue("teamAndProject", newValue);
    socket.current.emit("change-team", newValue);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {user ? "Select Team And Project *" : "Admin selects the team.."}
        </InputLabel>
        <Select
          defaultValue={""}
          disabled={!user}
          value={value}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={
            user ? "Select Team And Project *" : "Admin selects the team.."
          }
          {...register("teamAndProject", { required: "Select a team" })}
          onChange={handleChange}
        >
          {TEAMS.map((team) => (
            <MenuItem
              key={team.projectName}
              value={`${team.projectName} / ${team.contestants}`}
            >
              {team.projectName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
