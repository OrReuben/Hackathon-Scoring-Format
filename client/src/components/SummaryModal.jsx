import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { toast } from "react-toastify";
import "./SummaryModal.css";
import axios from "axios";
import { updateScores } from "../apiRoutes";

export default function SummaryModal({
  selectedTeam,
  goalScore,
  teamworkScore,
  technologiesScore,
  frontendDesignScore,
  frontendFunctionalityScore,
  backendFunctionalityScore,
  complicationScore,
  creativityScore,
  presentationScore,
  selectedContestants,
}) {
  const [open, setOpen] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [loads, setLoads] = useState(false);

  const handleClickOpen = () => {
    if (selectedTeam === "") {
      toast.error("Please select a team");
    } else if (
      goalScore > 0 &&
      teamworkScore > 0 &&
      technologiesScore > 0 &&
      frontendDesignScore > 0 &&
      frontendFunctionalityScore > 0 &&
      backendFunctionalityScore > 0 &&
      complicationScore > 0 &&
      creativityScore > 0 &&
      presentationScore > 0
    ) {
      setTotalScore(
        parseInt(goalScore) +
          parseInt(teamworkScore) +
          parseInt(technologiesScore) +
          parseInt(frontendDesignScore) +
          parseInt(frontendFunctionalityScore) +
          parseInt(backendFunctionalityScore) +
          parseInt(complicationScore) +
          parseInt(creativityScore) +
          parseInt(presentationScore)
      );
      setOpen(true);
    } else toast.error("Please fill in the form");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    try {
      setLoads(true);
      axios.patch(`${updateScores}`, {
        project: selectedTeam,
        contestants: selectedContestants,
        score: totalScore,
      });
      setLoads(false);
      toast.success("Successfully Applied!");
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong..");
    }
  };

  return (
    <div className="modal">
      <Button variant="contained" onClick={handleClickOpen}>
        Submit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Score Summary For : ${selectedTeam}`}
          <p> {`By : ${selectedContestants}`}</p>
        </DialogTitle>
        <DialogContent>
          <div className="score-info">
            <p>Goal Reached Score : {goalScore}</p>
            <p>Teamwork Score : {teamworkScore}</p>
            <p>Technologies Score : {technologiesScore}</p>
            <p>Front-end Design Score : {frontendDesignScore}</p>
            <p>Front-end Functionality Score : {frontendFunctionalityScore}</p>
            <p>Back-end Functionality Score : {backendFunctionalityScore}</p>
            <p>Complication Score : {complicationScore}</p>
            <p>Creativity Score : {creativityScore}</p>
            <p>Presentation Score : {presentationScore}</p>
            <hr />
            <h1>Total Team's Score : {totalScore}</h1>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button
            variant="contained"
            disabled={loads}
            onClick={handleSend}
            autoFocus
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
