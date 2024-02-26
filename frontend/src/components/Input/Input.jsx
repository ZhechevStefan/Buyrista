import styles from "./Input.module.css";

const Input = props => {
  const isInvalid = props.isInvalid;
  const errorText = props.errors;

  let element;
  if (props.element === "input") {
    element = (
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        label={props.label}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    );
  } else if (props.element === "select") {
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
      >
        <option value="">--Please choose an option--</option>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  // else if (props.element === "radio") {
  //   <input
  //     id={props.id}
  //     name={props.id}
  //     type={props.element}
  //     label={props.label}
  //     onChange={props.onChange}
  //     onBlur={props.onBlur}
  //     value={props.value}
  //   />;
  // }
  else {
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
    <div className={`${styles.container}  ${props.givenClass}`}>
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
