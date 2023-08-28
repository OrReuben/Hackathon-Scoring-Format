const express = require("express");
const {
  deleteParam,
  deleteProject,
  postNewParam,
  postNewProject,
  getParams,
  getProjects,
} = require("../controllers/adminController");
const { jwtTokenIsValid } = require("../middlewares/jwtMiddleware");
const router = express.Router();

router.get("/projects", getProjects);
router.get("/params", getParams);
router.post("/params/add", jwtTokenIsValid, postNewParam);
router.delete("/params/delete",jwtTokenIsValid,  deleteParam);
router.post("/projects/add", jwtTokenIsValid, postNewProject);
router.delete("/projects/delete", jwtTokenIsValid, deleteProject);

module.exports = router;
