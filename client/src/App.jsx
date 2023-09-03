import { useEffect, useState } from "react";
import GradeParameter from "./components/GradeParameter";
import "./App.css";
import SummaryModal from "./components/SummaryModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Leaderboard from "./components/Leaderboard";
import SelectTeam from "./components/SelectTeam";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useForm } from "react-hook-form";
import { useData } from "./context/dataContext";
import ParamModal from "./components/ParamModal";
import ProjectModal from "./components/ProjectModal";
import { useApi } from "./context/ApiContext";

function App() {
  const [refreshScoreboard, setRefreshScoreboard] = useState(0);
  const [user, setUser] = useState(localStorage.getItem("userToken") || null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const {
    data: { initialParams, params },
  } = useData();
  const { userRequest, getScores } = useApi();
  const {
    register,
    formState: { errors, isValid, submitCount },
    reset,
    setValue,
    handleSubmit,
    getValues,
    watch,
  } = useForm({
    defaultValues: initialParams,
  });

  const getFirstErrorMessage = () => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      return errors[firstErrorKey].message;
    }
    return null;
  };

  useEffect(() => {
    if (user) {
      const checkIfTokenIsValid = async () => {
        try {
          await userRequest.get(getScores);
        } catch (err) {
          toast.error("Token has expired, Please log in again");
          setUser(null);
          localStorage.removeItem("userToken");
        }
      };
      checkIfTokenIsValid();
    }
  }, []);

  useEffect(() => {
    if (!isValid && !editMode) {
      const firstErrorMessage = getFirstErrorMessage();
      if (firstErrorMessage) {
        toast.error(firstErrorMessage);
      }
    }
  }, [submitCount, isValid]);

  const onSubmit = () => {
    setOpen(true);
  };

  return (
    <div className="App">
      <ToastContainer />
      <Header
        setUser={setUser}
        user={user}
        setEditMode={setEditMode}
        editMode={editMode}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {!editMode ? (
          <SelectTeam
            register={register}
            user={user}
            watch={watch}
            setValue={setValue}
          />
        ) : (
          <ProjectModal />
        )}
        <div className="grid">
          {params.map(({ param, maxParamValue, _id }) => (
            <GradeParameter
              key={param}
              param={param}
              _id={_id}
              maxParamValue={maxParamValue}
              register={register}
              watch={watch}
              setValue={setValue}
              editMode={editMode}
            />
          ))}
          {editMode && <ParamModal />}
        </div>
        {!editMode && (
          <SummaryModal
            setRefreshScoreboard={setRefreshScoreboard}
            entries={getValues()}
            setOpen={setOpen}
            open={open}
            reset={reset}
          />
        )}
      </form>
      {user && (
        <Leaderboard
          refreshScoreboard={refreshScoreboard}
          user={user}
          setRefreshScoreboard={setRefreshScoreboard}
        />
      )}
      <Footer editMode={editMode} />
    </div>
  );
}

export default App;
