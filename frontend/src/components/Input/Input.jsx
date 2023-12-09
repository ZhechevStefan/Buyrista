import { useReducer, useEffect } from "react";

import { validate } from "../../util/validators.js";
import styles from "./Input.module.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case "TOUCHED":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.InitialValid || false
  });

  const { id, onChange } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onChange(id, value, isValid);
  }, [id, value, isValid, onChange]);

  const changeHandler = event => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCHED"
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        name={props.id}
        type={props.type}
        label={props.label}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        name={props.id}
        label={props.label}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`${styles["form-control"]} ${
        !inputState.isValid &&
        inputState.isTouched &&
        styles["form-control--invalid"]
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
