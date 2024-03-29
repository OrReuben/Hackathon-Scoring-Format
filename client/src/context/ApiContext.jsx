import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ApiContext = createContext();

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
  const [TOKEN, setTOKEN] = useState(localStorage.getItem("userToken") || null);
  const host = import.meta.env.VITE_API_ENDPOINT;

  const publicRequest = axios.create({
    baseURL: host,
  });

  const userRequest = axios.create({
    baseURL: host,
    headers: { token: `Bearer ${TOKEN}` },
  });

  useEffect(() => {
    userRequest.defaults.headers.common["token"] = `Bearer ${TOKEN}`;
  }, [TOKEN]);

  const userRoutes = `/user`;
  const scoreRoutes = `/scores`;
  const adminRoutes = `/admin`;
  const loginRoute = `${userRoutes}/login`;
  const getScores = `${scoreRoutes}`;
  const deleteScores = `${scoreRoutes}/reset`;
  const updateScores = `${scoreRoutes}/update-scores`;
  const getAllLogos = `${adminRoutes}/logos`;
  const getAllParams = `${adminRoutes}/params`;
  const getAllProjects = `${adminRoutes}/projects`;
  const deleteParam = `${adminRoutes}/params/delete`;
  const deleteProject = `${adminRoutes}/projects/delete`;
  const deleteLogo = `${adminRoutes}/logos/delete`;
  const postParam = `${adminRoutes}/params/add`;
  const postProject = `${adminRoutes}/projects/add`;
  const postLogo = `${adminRoutes}/logos/add`;

  return (
    <ApiContext.Provider
      value={{
        publicRequest,
        userRequest,
        TOKEN,
        setTOKEN,
        loginRoute,
        getScores,
        deleteScores,
        updateScores,
        getAllParams,
        getAllProjects,
        deleteParam,
        deleteProject,
        postParam,
        postProject,
        host,
        postLogo,
        deleteLogo,
        getAllLogos,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
