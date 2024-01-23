import { useState } from "react";

import styles from "./Preview.module.css";

const EmptyBackground = props => {
  const fileUrl = props.url;

  return (
    <div className={styles["preview-wrapper"]}>
      <div className={styles["image-wrapper"]}>
        <img src={fileUrl} className="preview" alt="Preview" />
      </div>
      <div className={styles["label-wrapper"]}>
        <label>Please add an image!</label>
      </div>
    </div>
  );
};

export default EmptyBackground;
