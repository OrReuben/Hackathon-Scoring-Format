import React from "react";
import { useState } from "react";
import "./GradeParameter.css";
const GradeParameter = ({ param, maxParamValue, func }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (
      newValue === "" ||
      (/^\d+$/.test(newValue) && newValue <= maxParamValue)
    ) {
      setValue(newValue);
      func(newValue);
    }
  };

  return (
    <div className="param-card">
      <h3>{param}</h3>
      <div>
        {" "}
        <input placeholder={`1-${maxParamValue}`} type="tel" value={value} onChange={handleChange} />{" "}
        <span> / {maxParamValue}</span>
      </div>
    </div>
  );
};

export default GradeParameter;
