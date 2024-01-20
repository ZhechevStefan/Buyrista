import styles from "./Input.module.css";

const Input = props => {
  const isInvalid = props.isInvalid;
  const errorText = props.errors;

  let element;
  if (props.element === "input") {
    element = (
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
    );
  } else if (props.element === "select") {
    console.log(props.options);
    let options = props.options.map(option => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });

    // console.log(options);

    element = (
      <select
        id={props.id}
        name={props.id}
        type={props.type}
        label={props.label}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        {...options}
      />
    );
  } else {
    element = (
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
  }

  return (
    <div className={`${styles.container}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
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
