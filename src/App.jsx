import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NotFound from "./Component/NotFound";
import Dashboard from "./Pages/DASHBOARD/Dashboard";
import Goals from "./Pages/GOALS/Goal";
import Body from "./Component/Body";

import GoalsDetail from "./Pages/GOALS/GoalDetail";
import Ma from "./Pages/MEASURED ACTIVITY/MeasuredActivity";
import EmptyPage from "./Component/Support/Empty";
import MaDetail from "./Pages/MEASURED ACTIVITY/MeasuredActivityDetail";
import Archive from "./Pages/ARCHIVE/Archive";
import PeriodComponent from "./Pages/ARCHIVE/ARCHIVE COMPONENT/PeriodComponent";
import ArchiveGoals from "./Pages/ARCHIVE/ARCHIVE COMPONENT/ArchiveGoals";
import ArchiveMa from "./Pages/ARCHIVE/ARCHIVE COMPONENT/ArchiveMa";

import Alert from "./Component/Alert";
import Login from "./Pages/AUTH/Login";
import Register from "./Pages/AUTH/Register";
import Biodata from "./Pages/AUTH/AddBiodata";

const ProtectedRoute = ({ user }) => {
  const decoded = jwtDecode(user);
  console.log(user);
  const now = Date();
  const dateNow = new Date(now).getTime() / 1000;
  console.log(dateNow > decoded.exp);
  console.log(decoded.exp);
  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (dateNow > decoded.exp) return <Navigate to="/login" replace />;
  return <Outlet />;
};

function App() {
  const user = useSelector((state) => state.PROCESS_REDUCER.token);
  const alert = useSelector((state) => state.PROCESS_REDUCER.isAlert);
  // console.log(user);
  return (
    <div className="relative  ubuntu">
      <Alert isAlert={alert} />
      <Routes>
        <Route path="/" element={<EmptyPage />}></Route>
        {/* <Route path="/load" element={<Loadings />} /> */}
        <Route index path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/loading" element={<Prototype />} /> */}
        <Route path="/add-biodata" element={<Biodata />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/acc" element={<Body />}>
            {/* <Route index path="peringkat" element={<Peringkat />}></Route> */}
            <Route index exact path="dashboard" element={<Dashboard />}></Route>

            <Route path="goals">
              <Route index element={<Goals />} />
              <Route path=":id" element={<GoalsDetail />} />
            </Route>
            <Route path="ma">
              <Route index element={<Ma />} />
              <Route path=":id" element={<MaDetail />} />
            </Route>
            <Route path="archives">
              <Route index element={<Archive />} />
              <Route path="period-page/:period" element={<PeriodComponent />} />
              <Route path="archive-goals" element={<ArchiveGoals />} />
              <Route path="archive-measured-activity" element={<ArchiveMa />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
