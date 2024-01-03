import styles from "./Input.module.css";

const Input = props => {
  const isInvalid = props.isInvalid;
  const errorText = props.errors;

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        name={props.id}
        type={props.type}
        label={props.label}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    ) : (
      <textarea
        id={props.id}
        name={props.id}
        label={props.label}
        rows={props.rows || 3}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    );

  return (
    <div
      className={`${styles["form-control"]} ${
        isInvalid && styles["form-control--invalid"]
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {isInvalid && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
