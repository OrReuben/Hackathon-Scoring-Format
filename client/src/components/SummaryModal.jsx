import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { toast } from "react-toastify";
import "./SummaryModal.css";
import axios from "axios";
import { updateScores } from "../apiRoutes";

export default function SummaryModal({
  setRefreshScoreboard,
  entries,
  open,
  setOpen,
  reset,
  setValue
}) {
  const [loads, setLoads] = useState(false);
  const totalScore = entries.reduce(
    (acc, value, index) =>
      index !== entries.length - 1 ? acc + Number(value[1]) : acc,
    0
  );
  let selectedTeam = entries[entries.length - 1][1].split("/")[0];
  let selectedContestants = entries[entries.length - 1][1].split("/")[1];

  const handleClose = () => {
    setOpen(false);
  };

  const checkIfVoted = async () => {
    const allVotes = localStorage.getItem("voted");
    if (!allVotes) {
      return false;
    } else {
      const parsedVotes = await JSON.parse(allVotes).votes;
      const voteResults = parsedVotes.map((vote) => vote === selectedTeam);
      return voteResults.includes(true);
    }
  };

  const handleSend = async () => {
    try {
      if (await checkIfVoted()) {
        toast.error("You have already voted for the team!");
      } else {
        setLoads(true);
        await axios.patch(`${updateScores}`, {
          project: selectedTeam,
          contestants: selectedContestants,
          score: totalScore,
        });
        setLoads(false);
        toast.success("Successfully Applied!");
        handleClose();
        reset();
        setRefreshScoreboard(Math.random());
        if (!localStorage.getItem("voted")) {
          localStorage.setItem(
            "voted",
            JSON.stringify({ votes: [selectedTeam] })
          );
        } else {
          const allVotes = JSON.parse(localStorage.getItem("voted"));
          localStorage.setItem(
            "voted",
            JSON.stringify({
              votes: [...allVotes.votes, selectedTeam],
            })
          );
        }
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong..");
    }
  };

  return (
    <div className="modal">
      <Button type="submit" variant="contained">
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
            {entries.map(
              (entry, i) =>
                i !== entries.length - 1 && (
                  <p key={entry[0]}>
                    {entry[0].replaceAll("_", " ")} Score: {entry[1]}
                  </p>
                )
            )}
            {/* <p>Goal Reached Score : {values[1]}</p>
            <p>Teamwork Score : {values[2]}</p>
            <p>Technologies Score : {values[3]}</p>
            <p>Front-end Design Score : {values[4]}</p>
            <p>Front-end Functionality Score : {values[5]}</p>
            <p>Complication Score : {values[6]}</p>
            <p>Creativity Score : {values[7]}</p>
            <p>Presentation Score : {values[8]}</p> */}
            <hr />
            <h1>Total Team's Score : {totalScore}</h1>
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            Back
          </Button>
          <Button
            type="button"
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
