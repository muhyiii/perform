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
import FromJabatan from "./Pages/auth/formjabatan";

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

function App() {
  const [user, setUser] = React.useState(localStorage.getItem("token"));
  return (
    <div className="relative  ">
      <Routes>
        {" "}
        <Route path="/" exact element={<Login />}>
          <Route index path="login" element={<Login />} />{" "}
          <Route path="formjabatan" element={<FromJabatan />}></Route>
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/acc" element={<Body />}>
            {/* <Route index path="peringkat" element={<Peringkat />}></Route> */}
            <Route index exact path="dashboard" element={<Dashboard />}></Route>

            <Route path="goals">
              <Route index element={<Goals />} />{" "}
              <Route path=":id" element={<GoalsDetail />} />
            </Route>
            <Route path="ma">
              <Route index element={<Ma />} />
              {/* <Route path=":id" element={<MaDetail />} /> */}
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
