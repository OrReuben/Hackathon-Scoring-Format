import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { getAllParams, getAllProjects } from "../apiRoutes";
import Loading from "../components/Loading";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [params, setParams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialParams, setInitialParams] = useState({});

  const getData = useCallback(async (ignore = false) => {
    const promises = await Promise.all([
      axios.get(getAllParams),
      axios.get(getAllProjects),
    ]);
    const paramsObject = promises[0].data.reduce((acc, param) => {
      acc[param.param] = "";
      return acc;
    }, {});
    if (!ignore) {
      setParams(promises[0].data);
      setProjects(promises[1].data);
      setInitialParams({ ...paramsObject, teamAndProject: "" });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    getData(ignore);
    return () => {
      ignore = true;
    };
  }, [getData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <DataContext.Provider value={{ projects, params, initialParams, getData }}>
      {children}
    </DataContext.Provider>
  );
}
