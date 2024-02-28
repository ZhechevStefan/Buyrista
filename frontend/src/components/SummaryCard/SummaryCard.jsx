import styles from "./SummaryCard.module.css";

const SummaryCard = props => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h3>{props.title}</h3>
      </div>
      {props.content.map((info, idx) => (
        <p key={idx}>{info}</p>
      ))}
    </div>
  );
};

export default SummaryCard;
