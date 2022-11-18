import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyPage = () => {
  const navigate = useNavigate();
  //   React.useEffect(() => navigate("/login"), []);
  setTimeout(() => {
    navigate("/login");
  }, 1000);
  return <div></div>;
};

export default EmptyPage;
