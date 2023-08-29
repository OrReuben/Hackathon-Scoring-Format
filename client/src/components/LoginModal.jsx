import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useApi } from "../context/ApiContext";

export default function LoginModal({ setUser }) {
  const [open, setOpen] = useState(false);
  const [loads, setLoads] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { username: "", password: "" },
  });
  const { publicRequest, loginRoute, setTOKEN } = useApi();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async ({ username, password }) => {
    try {
      setLoads(true);
      const { data: userToken } = await publicRequest.post(loginRoute, {
        username,
        password,
      });
      setOpen(false);
      toast.success("Successfully logged!");
      localStorage.setItem("userToken", userToken);
      setTOKEN(userToken);
      setUser(userToken);
    } catch (err) {
      toast.error("Incorrect Credentials");
    } finally {
      setLoads(false);
    }
  };

  return (
    <div>
      <Button
        variant="string"
        onClick={handleClickOpen}
        sx={{ flexDirection: "column" }}
      >
        <AiOutlineLogin />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <form onSubmit={handleSubmit(handleLogin)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="string"
              fullWidth
              variant="standard"
              {...register("username")}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              {...register("password")}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loads}>
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
