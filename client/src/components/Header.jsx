import React from "react";
import "./Header.css";
import LoginModal from "./LoginModal";
import { AiOutlineEdit } from "react-icons/ai";
import { MdTransitEnterexit } from "react-icons/md";
import { Button } from "@mui/material";

const Header = ({ setUser, user, setEditMode, editMode }) => {
  const handleEditMode = () => {
    if (user) {
      setEditMode((prev) => !prev);
    }
  };

  return (
    <div className="header-container">
      <h1>Hackathon</h1>
      {!user ? (
        <div className="btn">
          <LoginModal setUser={setUser} />
          <span> Login </span>
        </div>
      ) : (
        <div className="btn">
          <Button
            variant="string"
            onClick={handleEditMode}
            sx={{ flexDirection: "column" }}
          >
            {!editMode ? (
              <>
                <AiOutlineEdit />
                <span> Edit </span>
              </>
            ) : (
              <>
                <MdTransitEnterexit />
                <span> Exit </span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
