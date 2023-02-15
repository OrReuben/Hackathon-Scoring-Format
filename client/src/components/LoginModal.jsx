import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import axios from "axios";
import { loginRoute } from "../apiRoutes";
import { toast } from "react-toastify";

export default function LoginModal({ setUser }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loads, setLoads] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = async () => {
    try {
      setLoads(true);
      const login = await axios.post(`${loginRoute}`, { username, password });
      if (login) {
        setOpen(false);
        toast.success(login.data);
        setUser(true);
        setLoads(false);
      }
    } catch (err) {
      toast.error("Incorrect Credentials");
      setLoads(false);
    }
  };

  return (
    <div>
      <Button variant="string" onClick={handleClickOpen}>
        <AiOutlineLogin />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="string"
            fullWidth
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin} disabled={loads}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
