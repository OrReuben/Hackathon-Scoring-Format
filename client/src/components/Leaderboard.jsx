import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import axios from "axios";
import { deleteScores, getScores } from "../apiRoutes";
import { useEffect } from "react";
import Loading from "./Loading";
import "./Leaderboard.css";
import { toast } from "react-toastify";

export default function Leaderboard({
  refreshScoreboard,
  setRefreshScoreboard,
  user,
}) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchScores = async () => {
        await axios.get(`${getScores}`).then(({ data }) => setScores(data));
        setLoading(false);
      };
      fetchScores();
    } catch (err) {
      console.log(err.message);
    }
  }, [refreshScoreboard]);

  const clearLeaderboard = async () => {
    if (!confirm("Are you sure you want to delete the collection?")) {
      return;
    }
    try {
      const { data } = await axios.delete(deleteScores);
      setRefreshScoreboard((prev) => prev + 1);
      toast.success(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : scores.length === 0 ? (
        <h2 style={{ textAlign: "center", padding: "2rem 0" }}>
          No Scores Currently!
        </h2>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          {user && (
            <button onClick={clearLeaderboard} className="leaderboard-button">
              Clear Leaderboard
            </button>
          )}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Project</TableCell>
                <TableCell align="left">Contestants</TableCell>
                <TableCell align="center">Total Score</TableCell>
                <TableCell align="center">Total Votes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {row.project}
                  </TableCell>
                  <TableCell align="left">{row.contestants}</TableCell>
                  <TableCell align="center">{row.totalScore}</TableCell>
                  <TableCell align="center">{row.totalVotes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
