import { useState } from "react";
import GradeParameter from "./components/GradeParameter";
import "./App.css";
import SummaryModal from "./components/SummaryModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Leaderboard from "./components/Leaderboard";
import SelectTeam from "./components/SelectTeam";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedContestants, setSelectedContestants] = useState("");
  const [goalScore, setGoalScore] = useState(0);
  const [teamworkScore, setTeamworkScore] = useState(0);
  const [technologiesScore, setTechnologiesScore] = useState(0);
  const [frontendDesignScore, setFrontendDesignScore] = useState(0);
  const [frontendFunctionalityScore, setFrontendFunctionalityScore] =
    useState(0);
  const [backendFunctionalityScore, setBackendFunctionalityScore] = useState(0);
  const [complicationScore, setComplicationScore] = useState(0);
  const [creativityScore, setCreativityScore] = useState(0);
  const [presentationScore, setPresentationScore] = useState(0);
  const [refreshScoreboard, setRefreshScoreboard] = useState(0);

  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <SelectTeam
        setSelectedTeam={setSelectedTeam}
        SelectedTeam={selectedTeam}
        setSelectedContestants={setSelectedContestants}
      />
      <div className="grid">
        <GradeParameter
          param={"Goal Reached"}
          maxParamValue={10}
          func={setGoalScore}
        />
        <GradeParameter
          param={"Teamwork"}
          maxParamValue={15}
          func={setTeamworkScore}
        />
        <GradeParameter
          param={"Technologies used"}
          maxParamValue={10}
          func={setTechnologiesScore}
        />
        <GradeParameter
          param={"Front-end Design"}
          maxParamValue={10}
          func={setFrontendDesignScore}
        />
        <GradeParameter
          param={"Front-end Functionality"}
          maxParamValue={10}
          func={setFrontendFunctionalityScore}
        />
        <GradeParameter
          param={"Back-end Functionality"}
          maxParamValue={10}
          func={setBackendFunctionalityScore}
        />
        <GradeParameter
          param={"Complication"}
          maxParamValue={10}
          func={setComplicationScore}
        />
        <GradeParameter
          param={"Creativity"}
          maxParamValue={10}
          func={setCreativityScore}
        />
        <GradeParameter
          param={"Presentation"}
          maxParamValue={15}
          func={setPresentationScore}
        />
      </div>
      <SummaryModal
        selectedTeam={selectedTeam}
        goalScore={goalScore}
        teamworkScore={teamworkScore}
        technologiesScore={technologiesScore}
        frontendDesignScore={frontendDesignScore}
        frontendFunctionalityScore={frontendFunctionalityScore}
        backendFunctionalityScore={backendFunctionalityScore}
        complicationScore={complicationScore}
        creativityScore={creativityScore}
        presentationScore={presentationScore}
        selectedContestants={selectedContestants}
        setRefreshScoreboard={setRefreshScoreboard}
      />
      {localStorage.getItem('logged') && <Leaderboard refreshScoreboard={refreshScoreboard} />}
      <Footer />
    </div>
  );
}

export default App;
