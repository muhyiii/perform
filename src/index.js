import React from "react";
import "./Images/fonts/MazzardH-Black.otf";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistedStore } from "./Redux/Store/index";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { PersistGate } from "redux-persist/integration/react";
// ..
AOS.init({
  duration: 1300,
  once: false,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>{" "}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
