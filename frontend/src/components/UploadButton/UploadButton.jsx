import styles from "./Input.module.css";

const Input = props => {
  const isInvalid = props.isInvalid;
  const errorText = props.errors;

  return (
    <div className={`${styles["btn-wrapper"]}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.id}
        type="file"
        label={props.label}
        onChange={props.onChange}
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
};

export default Input;
