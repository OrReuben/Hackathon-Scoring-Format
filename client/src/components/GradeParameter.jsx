import React from "react";
import "./GradeParameter.css";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@mui/material";
import axios from "axios";
import { deleteParam } from "../apiRoutes";
import { toast } from "react-toastify";
import { useData } from "../context/dataContext";
const GradeParameter = ({
  param,
  maxParamValue,
  register,
  watch,
  setValue,
  _id,
  editMode,
}) => {
  const value = watch(param);
  const { getData } = useData();

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (
      newValue === "" ||
      (/^\d+$/.test(newValue) && newValue <= maxParamValue)
    ) {
      setValue(param, newValue);
    }
  };

  const handleDelete = async (paramId, param) => {
    if (!confirm(`Are you sure you want to delete ${param}?`)) {
      return;
    }
    try {
      const { data } = await axios.delete(deleteParam, {
        data: { paramId },
        withCredentials: true,
      });
      toast.success(data);
      await getData();
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="param-card">
      <h3>{param}</h3>
      <div>
        <input
          placeholder={`1-${maxParamValue}`}
          type="tel"
          value={value}
          {...register(param, {
            required: `${param} is required!`,
          })}
          onChange={handleChange}
        />
        <span> / {maxParamValue}</span>
      </div>
      {editMode && (
        <Button
          variant="text"
          sx={{ color: "red", position: "absolute", top: 10, right: 0 }}
          onClick={() => handleDelete(_id, param)}
        >
          <AiOutlineDelete />
        </Button>
      )}
    </div>
  );
};

export default GradeParameter;
