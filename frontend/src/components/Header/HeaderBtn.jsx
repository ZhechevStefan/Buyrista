import styles from "./HeaderBtn.module.css";

const HeaderButton = props => {
  return (
    <button
      className={`${styles["header-btn"]} ${props.isShown ? styles.open : ""}`}
      onMouseEnter={props.isShown ? () => props.clear : props.open}
      onMouseLeave={props.close}
    >
      {props.name}
    </button>
  );
};

export default HeaderButton;
