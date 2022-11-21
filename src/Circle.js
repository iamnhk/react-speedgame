import React from "react";

const Circle = (props) => {
  return (
    <div
      className={`circle ${props.active ? "active" : ""}`}
      style={{ pointerEvents: props.gameStatus ? "all" : "none" }}
      onClick={props.gameStatus ? props.click : null}
    ></div>
  );
};

export default Circle;
