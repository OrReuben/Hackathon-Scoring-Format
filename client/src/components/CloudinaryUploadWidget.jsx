import React, { useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import { useData } from "../context/dataContext";

const CloudinaryUploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const { userRequest, postLogo } = useApi();
  const {getData} = useData()

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dmxcfpaqb",
        uploadPreset: "pg6r4kyt",
      },
      async function (err, result) {
        if (!err && result && result.event === "success") {
          const logoUrl = result.info.url;
          const { data } = await userRequest.post(postLogo, { logoUrl });
          toast.success(data);
        } else if (err) {
          toast.error("Something went wrong..");
        }
        if (!err && result && result.event === "close") {
         await getData()
        }
      }
    );
  }, []);
  return (
    <Button
      id="upload_widget"
      sx={{ width: "100%", padding: 2 }}
      variant="contained"
      color="info"
      onClick={() => widgetRef.current.open()}
    >
      UPLOAD NEW LOGO
    </Button>
  );
};

export default CloudinaryUploadWidget;
