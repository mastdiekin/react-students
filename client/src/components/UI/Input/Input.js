import React from "react";
import "./Input.sass";
import misc from "../../../assets/sass/misc.sass";

const input = (props) => {
  let inputClasses = [];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(misc.error);
  }

  const typeInput = (
    <input
      className={props.class + inputClasses.join(" ")}
      type={props.format}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.changed}
    />
  );
  const typeTextarea = (
    <textarea
      className={props.class + inputClasses.join(" ")}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.changed}
      value={props.value}
    ></textarea>
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
