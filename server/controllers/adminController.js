const ParamModel = require("../models/paramModel");
const ProjectModel = require("../models/projectsModel");
const LogoModel = require("../models/logoModel");

const postNewParam = async (req, res) => {
  try {
    const { param, maxParamValue } = req.body;
    if (!param || !maxParamValue) {
      return res.status(404).json("Missing parameters!");
    }
    if (await ParamModel.findOne({ param }).lean()) {
      return res.status(404).json("Param already exist!");
    }
    await ParamModel.create({ param, maxParamValue });
    res.status(200).json("Param has been successfully created!");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const postNewProject = async (req, res) => {
  try {
    const { projectName, contestants } = req.body;
    if (!projectName || !contestants) {
      return res.status(404).json("Missing parameters!");
    }
    if (await ProjectModel.findOne({ projectName }).lean()) {
      return res.status(404).json("Project already exist!");
    }
    await ProjectModel.create({ projectName, contestants });
    res.status(200).json("Project has been successfully created!");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const postNewLogo = async (req, res) => {
  try {
    const { logoUrl } = req.body;
    if (!logoUrl) {
      return res.status(404).json("Missing parameters!");
    }
    if (await LogoModel.findOne({ logoUrl }).lean()) {
      return res.status(404).json("Logo already exist!");
    }
    await LogoModel.create({ logoUrl });
    res.status(200).json("Logo has been successfully created!");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteParam = async (req, res) => {
  try {
    const { paramId } = req.body;
    if (!paramId) {
      return res.status(404).json("Missing parameters!");
    }
    const paramExists = await ParamModel.findById(paramId);
    if (!paramExists) {
      return res.status(404).json("Incorrect ID!");
    }

    await ParamModel.findByIdAndDelete(paramId);
    res.status(200).json("Param has been successfully deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(404).json("Missing parameters!");
    }
    const paramExists = await ProjectModel.findById(projectId);
    if (!paramExists) {
      return res.status(404).json("Incorrect ID!");
    }

    await ProjectModel.findByIdAndDelete(projectId);
    res.status(200).json("Project has been successfully deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteLogo = async (req, res) => {
  try {
    const { logoId } = req.body;
    if (!logoId) {
      return res.status(404).json("Missing parameters!");
    }
    const logoExists = await LogoModel.findById(logoId);
    if (!logoExists) {
      return res.status(404).json("Incorrect ID!");
    }

    await LogoModel.findByIdAndDelete(logoId);
    res.status(200).json("Logo has been successfully deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getParams = async (req, res) => {
  try {
    const allParams = await ParamModel.find({});
    res.status(200).json(allParams);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getProjects = async (req, res) => {
  try {
    const allProjects = await ProjectModel.find({});
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getLogos = async (req, res) => {
  try {
    const allLogos = await LogoModel.find({});
    res.status(200).json(allLogos);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  postNewParam,
  postNewProject,
  deleteParam,
  deleteProject,
  getParams,
  getProjects,
  postNewLogo,
  deleteLogo,
  getLogos,
};
