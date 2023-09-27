import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useData } from "../context/dataContext";
import { useApi } from "../context/ApiContext";

export default function ProjectModal() {
  const [open, setOpen] = useState(false);
  const [loads, setLoads] = useState(false);
  const { data:{projects}, getData } = useData();
  const { userRequest, postProject, deleteProject } = useApi();

  const { register, handleSubmit } = useForm({
    defaultValues: { projectName: "", contestants: "" },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostProject = async ({ projectName, contestants }) => {
    try {
      setLoads(true);
      await userRequest.post(postProject, { projectName, contestants });
      await getData();
      toast.success("Successfully Added");
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoads(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      if (!confirm("Are you sure you want to delete?")) {
        return;
      }
      setLoads(true);
      await userRequest.delete(deleteProject, {
        data: { projectId },
      });
      await getData();
      toast.success("Successfully Removed");
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoads(false);
    }
  };

  return (
    <div>
      <Button
        fullWidth
        variant="string"
        sx={{ border: "2px solid black", minWidth: 300, minHeight: 100 }}
        onClick={handleClickOpen}
      >
        Edit Projects
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>PROJECT LIST</DialogTitle>
        <form onSubmit={handleSubmit(handlePostProject)}>
          <DialogContent>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {projects.map((project) => (
                <li
                  key={project._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    {project.projectName} / {project.contestants}
                  </p>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    <BsTrash />
                  </Button>
                </li>
              ))}
            </ul>
            <TextField
              autoFocus
              margin="dense"
              id="projectName"
              label="Project Name"
              type="string"
              fullWidth
              variant="standard"
              {...register("projectName")}
            />
            <TextField
              margin="dense"
              id="contestants"
              label="Contestants"
              type="string"
              fullWidth
              variant="standard"
              {...register("contestants")}
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
