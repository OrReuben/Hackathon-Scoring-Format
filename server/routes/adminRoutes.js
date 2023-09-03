const express = require("express");
const {
  deleteParam,
  deleteProject,
  postNewParam,
  postNewProject,
  getParams,
  getProjects,
  getLogos,
  postNewLogo,
  deleteLogo,
} = require("../controllers/adminController");
const { jwtTokenIsValid } = require("../middlewares/jwtMiddleware");
const router = express.Router();

router.get("/projects", getProjects);
router.get("/params", getParams);
router.get("/logos", getLogos);
router.post("/params/add", jwtTokenIsValid, postNewParam);
router.post("/projects/add", jwtTokenIsValid, postNewProject);
router.post("/logos/add", jwtTokenIsValid, postNewLogo);
router.delete("/params/delete", jwtTokenIsValid, deleteParam);
router.delete("/projects/delete", jwtTokenIsValid, deleteProject);
router.delete("/logos/delete", jwtTokenIsValid, deleteLogo);

module.exports = router;
