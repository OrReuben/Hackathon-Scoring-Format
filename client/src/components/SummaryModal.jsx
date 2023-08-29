import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { toast } from "react-toastify";
import "./SummaryModal.css";
import Cookies from "js-cookie";
import { useApi } from "../context/ApiContext";

export default function SummaryModal({
  setRefreshScoreboard,
  entries,
  open,
  setOpen,
  reset,
}) {
  const [loads, setLoads] = useState(false);
  const totalScore = Object.entries(entries).reduce((acc, value) => {
    return value[0] !== "teamAndProject" ? acc + Number(value[1]) : acc;
  }, 0);
  const { publicRequest, updateScores } = useApi();
  let selectedTeam = entries.teamAndProject.split("/")[0];
  let selectedContestants = entries.teamAndProject.split("/")[1];

  const handleClose = () => {
    setOpen(false);
  };

  const checkIfVoted = () => {
    const allVotes = Cookies.get("voted");
    if (!allVotes) {
      return false;
    } else {
      const parsedVotes = JSON.parse(allVotes).votes;
      const voteResults = parsedVotes.map((vote) => vote === selectedTeam);
      return voteResults.includes(true);
    }
  };

  const handleSend = async () => {
    try {
      if (checkIfVoted()) {
        toast.error("You have already voted for the team!");
      } else {
        setLoads(true);
        await publicRequest.patch(updateScores, {
          project: selectedTeam,
          contestants: selectedContestants,
          score: totalScore,
        });
        toast.success("Successfully Applied!");
        handleClose();
        reset();
        setRefreshScoreboard(Math.random());
        if (!Cookies.get("voted")) {
          Cookies.set("voted", JSON.stringify({ votes: [selectedTeam] }), {
            expires: 0.5,
          });
        } else {
          const allVotes = JSON.parse(Cookies.get("voted"));
          Cookies.set(
            "voted",
            JSON.stringify({ votes: [...allVotes.votes, selectedTeam] }),
            { expires: 0.5 }
          );
        }
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong..");
    } finally {
      setLoads(false);
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
            {Object.entries(entries).map(
              (entry, i) =>
                entry[0] !== "teamAndProject" && (
                  <p key={entry[0]}>
                    {entry[0]} Score: {entry[1]}
                  </p>
                )
            )}
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
