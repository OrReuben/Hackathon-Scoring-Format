import React from "react";
import "./GradeParameter.css";

const GradeParameter = ({
  param,
  maxParamValue,
  register,
  watch,
  setValue,
}) => {
  const paramName = param.replaceAll(" ", "_");
  const value = watch(paramName);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (
      newValue === "" ||
      (/^\d+$/.test(newValue) && newValue <= maxParamValue)
    ) {
      setValue(paramName, newValue);
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
          {...register(paramName, {
            required: `${param} is required!`,
          })}
          onChange={handleChange}
        />
        <span> / {maxParamValue}</span>
      </div>
    </div>
  );
};

export default GradeParameter;
