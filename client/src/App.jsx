import { useEffect, useRef, useState } from "react";
import GradeParameter from "./components/GradeParameter";
import "./App.css";
import SummaryModal from "./components/SummaryModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Leaderboard from "./components/Leaderboard";
import SelectTeam from "./components/SelectTeam";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GRADING_PARAMS from "./constants/gradingParams.json";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

let initialValues = {};

GRADING_PARAMS.forEach(
  (item) => (initialValues[item.param.replaceAll(" ", "_")] = "")
);

function App() {
  const [refreshScoreboard, setRefreshScoreboard] = useState(0);
  const [user, setUser] = useState(Cookies.get("logged") || null);
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors, isValid, submitCount },
    reset,
    setValue,
    handleSubmit,
    getValues,
    watch,
  } = useForm({ defaultValues: { ...initialValues, teamAndProject: "" } });

  const getFirstErrorMessage = () => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      return errors[firstErrorKey].message;
    }
    return null;
  };

  useEffect(() => {
    if (!isValid) {
      const firstErrorMessage = getFirstErrorMessage();
      if (firstErrorMessage) {
        toast.error(firstErrorMessage);
      }
    }
  }, [submitCount, isValid]);

  const onSubmit = (formValues) => {
    setOpen(true);
  };

  return (
    <div className="App">
      <ToastContainer />
      <Header setUser={setUser} user={user} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectTeam
          register={register}
          user={user}
          watch={watch}
          setValue={setValue}
        />
        <div className="grid">
          {GRADING_PARAMS.map(({ param, maxParamValue }) => (
            <GradeParameter
              key={param}
              param={param}
              maxParamValue={maxParamValue}
              register={register}
              watch={watch}
              setValue={setValue}
            />
          ))}
        </div>
        <SummaryModal
          setRefreshScoreboard={setRefreshScoreboard}
          entries={Object.entries(getValues())}
          setOpen={setOpen}
          open={open}
          reset={reset}
        />
      </form>
      {user && (
        <Leaderboard
          refreshScoreboard={refreshScoreboard}
          user={user}
          setRefreshScoreboard={setRefreshScoreboard}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
