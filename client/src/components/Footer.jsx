import React from "react";
import "./Footer.css";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { useData } from "../context/dataContext";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";

const Footer = ({ editMode }) => {
  const {
    data: { logos },
    getData,
  } = useData();
  const { userRequest, deleteLogo } = useApi();

  const handleDelete = async (logoId) => {
    try {
      if (confirm("Are you sure you want to delete this logo?")) {
        const { data } = await userRequest.delete(deleteLogo, {
          data: { logoId },
        });
        await getData();
        toast.success(data);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section style={{padding:'2rem 0'}}>
      <div className="footer-container">
        {logos.map(({ logoUrl, _id }) => (
          <div key={_id} className="img-container">
            <img src={logoUrl} alt="logo" />
            {editMode && (
              <Button
                variant="text"
                sx={{ color: "red", position: "absolute", top: '3.5rem', right: 0 }}
                onClick={() => handleDelete(_id)}
              >
                <AiOutlineDelete />
              </Button>
            )}
          </div>
        ))}
      </div>
      {editMode && (
        <div style={{ width: "100%", padding: "20px 0" }}>
          <CloudinaryUploadWidget />
        </div>
      )}
    </section>
  );
};

export default Footer;
