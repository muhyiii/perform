import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Component/NotFound";
import Dashboard from "./Pages/dashboard/dashboard";
import Goals from "./Pages/goals";
import Body from "./Component/Body";
import GoalsDetail from "./Pages/goals/goalsDetail";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";


function App() {
  return (
    <div className="relative ">
      <Routes>
      <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Body />}>
          <Route index path="dashboard" element={<Dashboard />}></Route>
          <Route path="goals" element={<Goals />}>
            <Route path=":id" element={<GoalsDetail />} />
          </Route>
          <Route path="ma"></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
