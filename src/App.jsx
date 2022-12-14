import "./App.css";

import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NotFound from "./Component/NotFound";
import Dashboard from "./Pages/dashboard/dashboard";
import Goals from "./Pages/goals/goals";
import Body from "./Component/Body";
import React from "react";
import GoalsDetail from "./Pages/goals/goalsDetail";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import Ma from "./Pages/measured/ma";
import Biodata from "./Pages/auth/biodata";
import EmptyPage from "./Component/Support/Empty";
import MaDetail from "./Pages/measured/maDetail";
import Archive from "./Pages/archive/archive";
import PeriodComponent from "./Pages/archive/archive component/periodComponent";
import ArchiveGoals from "./Pages/archive/archive component/archiveGoal";
import ArchiveMa from "./Pages/archive/archive component/archiveMa";


const ProtectedRoute = ({ user }) => {
  // const loading = useSelector((state) => state.auth?.isLoading);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  // if (loading) return <Loadings />;
  return <Outlet />;
};

function App() {
  return (
    <div className="relative  roboto">
      <Routes>
        <Route path="/" element={<EmptyPage />}></Route>
        {/* <Route path="/load" element={<Loadings />} /> */}
        <Route index path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/loading" element={<Prototype />} /> */}
        <Route path="/add-biodata" element={<Biodata />} />
        <Route
          element={<ProtectedRoute user={localStorage.getItem("token")} />}
        >
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
