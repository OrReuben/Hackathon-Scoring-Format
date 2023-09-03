import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";
import { useApi } from "../context/ApiContext";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [data, setData] = useState({
    params: [],
    projects: [],
    logos: [],
    initialParams: {},
  });
  const [loading, setLoading] = useState(true);
  const { publicRequest, getAllParams, getAllProjects, getAllLogos } = useApi();

  const getData = useCallback(async (ignore = false) => {
    const promises = await Promise.all([
      publicRequest.get(getAllParams),
      publicRequest.get(getAllProjects),
      publicRequest.get(getAllLogos),
    ]);

    const paramsObject = promises[0].data.reduce((acc, param) => {
      acc[param.param] = "";
      return acc;
    }, {});

    if (!ignore) {
      const newData = {
        params: promises[0].data,
        projects: promises[1].data,
        logos: promises[2].data,
        initialParams: { ...paramsObject, teamAndProject: "" },
      };
      setData(newData);
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
    <DataContext.Provider value={{ data, getData }}>
      {children}
    </DataContext.Provider>
  );
}
