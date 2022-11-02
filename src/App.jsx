import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Component/NotFound";
import Dashboard from "./Pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="dashboard" index element={<Dashboard />}></Route>
      <Route path="goals"></Route>
      <Route path="ma"></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
