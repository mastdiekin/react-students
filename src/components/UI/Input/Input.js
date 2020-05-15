import React from "react";
import "./Input.sass";

const input = (props) => {
  const typeInput = (
    <input
      type={props.format}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
  const typeTextarea = (
    <textarea name={props.name} placeholder={props.placeholder}>
      {props.value}
    </textarea>
  );
  switch (props.type) {
    case "input":
      return typeInput;
    case "textarea":
      return typeTextarea;
    default:
      return typeInput;
  }
};

export default input;
