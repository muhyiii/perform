import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyPage = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    if (localStorage.getItem("token")) return navigate("/acc/dashboard");
    return navigate("/login");
  }, 1000);
  return <div></div>;
};

export default EmptyPage;
