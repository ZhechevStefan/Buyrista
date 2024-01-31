import styles from "./Loader.module.css";

const Loader = props => {
  return (
    <div style={{ textAlign: "center" }}>
      <div className={`${styles.circle} ${styles.loader}`}></div>
    </div>
  );
};

export default Loader;
