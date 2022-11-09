import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Component/NotFound";
import Dashboard from "./Pages/dashboard/dashboard";
import Goals from "./Pages/goals";
import Body from "./Component/Body";
<<<<<<< HEAD
import GoalsDetail from "./Pages/SemiPage/goalsDetail";
import Peringkat from "../src/Pages/peringkat";
import Ma from "./Pages/ma";
=======
import GoalsDetail from "./Pages/goals/goalsDetail";

import Peringkat from "./Pages/dashboard/peringkat";
>>>>>>> 3189a27977d2117bb6d520abad7a604b8311cb48

function App() {
  return (
    <div className="relative ">
      <Routes>
        <Route path="/" element={<Body />}>
           {/* <Route index path="peringkat" element={<Peringkat />}></Route> */}
          <Route index path="dashboard" element={<Dashboard />}></Route>
          <Route path="goals" element={<Goals />}>
            <Route path=":id" element={<GoalsDetail />} />
          </Route>
          <Route path="ma" element={<Ma/>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
