import { Link } from "react-router-dom";

import styles from "./Button.module.css";

const Button = props => {
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`${styles.button} ${styles.button}--${
          props.size || "default"
        } ${props.inverse && styles["button--inverse"]} ${
          props.danger && styles["button--danger"]
        }`}
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
      className={`${styles.button} ${styles.button}--${
        props.size || "default"
      } ${props.inverse && styles["button--inverse"]} ${
        props.danger && styles["button--danger"]
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
