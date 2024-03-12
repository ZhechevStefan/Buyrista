import { Link } from "react-router-dom";

import styles from "./Button.module.css";

const Button = props => {
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        state={props.state}
        style={props.width ? { width: props.width } : { width: "auto" }}
        className={`${styles.button} ${styles.button}--${
          props.size || "default"
        } ${props.withMargins && styles["button-margins"]} ${
          props.inverse && styles["button--inverse"]
        } ${props.danger && styles["button--danger"]}`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.width ? { width: props.width } : { width: "auto" }}
      className={`${styles.button} ${styles.grow}  ${
        props.withMargins && styles["button-margins"]
      } ${props.inverse && styles["button--inverse"]} ${
        props.transparent && styles["button--transparent"]
      } ${props.danger && styles["button--danger"]}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
