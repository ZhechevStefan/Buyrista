import styles from "./HeaderBtn.module.css";

const HeaderButton = props => {
  return (
    <button
      className={`${styles["header-btn"]} ${props.isShown ? styles.open : ""}`}
    >
      {props.name}
    </button>
  );
};

export default HeaderButton;
