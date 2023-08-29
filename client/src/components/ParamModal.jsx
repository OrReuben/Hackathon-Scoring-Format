import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useData } from "../context/dataContext";
import { useApi } from "../context/ApiContext";

export default function ParamModal() {
  const [open, setOpen] = useState(false);
  const [loads, setLoads] = useState(false);
  const { getData } = useData();
  const { userRequest, postParam } = useApi();

  const { register, handleSubmit } = useForm({
    defaultValues: { param: "", maxParamValue: "" },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostParam = async ({ param, maxParamValue }) => {
    try {
      setLoads(true);
      await userRequest.post(
        postParam,
        { param, maxParamValue },
        { withCredentials: true }
      );
      await getData();
      toast.success("Successfully Added");
      handleClose();
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoads(false);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{ background: "#222222", minWidth: 300, minHeight: 100 }}
        onClick={handleClickOpen}
      >
        <AiOutlinePlus />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post new param</DialogTitle>
        <form onSubmit={handleSubmit(handlePostParam)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="param"
              label="Param"
              type="string"
              fullWidth
              variant="standard"
              {...register("param")}
            />
            <TextField
              margin="dense"
              id="maxParamValue"
              label="MaxParamValue"
              type="number"
              fullWidth
              variant="standard"
              {...register("maxParamValue")}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loads}>
              Post
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
