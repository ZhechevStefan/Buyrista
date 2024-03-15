import { useState, useEffect } from "react";

import styles from "./HeaderBtnIcon.module.css";

const HeaderBtnIcon = props => {
  const [iconIsHighlighted, setIconIsHighlighted] = useState(false);
  const { numberOfItems, img, alt, name } = props;

  useEffect(() => {
    if (numberOfItems === 0) {
      return;
    }
    setIconIsHighlighted(true);
    const timer = setTimeout(() => {
      setIconIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [numberOfItems]);

  return (
    <span className={`${styles.icon} ${iconIsHighlighted ? styles.bump : ""}`}>
      <img className={`${styles.img}`} src={img} alt={alt} />
      <span className={styles.label}>{name}</span>
      <span className={numberOfItems ? styles.badge : styles.invisible}>
        {numberOfItems}
      </span>
    </span>
  );
};

export default HeaderBtnIcon;
