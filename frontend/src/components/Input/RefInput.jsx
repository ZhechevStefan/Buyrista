import { forwardRef } from "react";
import styles from "./Input.module.css";

const RefInput = forwardRef(function RefInput(props, ref) {
  const isInvalid = props.isInvalid;
  const errorText = props.errors;

  return (
    <div className={`${styles.container}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.id}
        type="file"
        label={props.label}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        ref={ref}
      />
      {isInvalid ? (
        <div>
          <p>{errorText}</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
});

export default RefInput;
