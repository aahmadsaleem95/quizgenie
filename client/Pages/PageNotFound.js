import React from "react";
import { useNavigate } from "react-router-dom";
import svg from "../assests/404.svg";

export const PageNotFound = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/");
  };
  return (
    <>
      <div className="cont-404">
        <img src={svg} alt="svg" />
        <button onClick={clickHandler}>Back to Home</button>
      </div>
    </>
  );
};
