import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Component/NotFound";
import Dashboard from "./Pages/dashboard";
import Goals from "./Pages/goals";
import Body from "./Component/Body";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Body/>}>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="goals" element={<Goals />}></Route>
        <Route path="ma"></Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
