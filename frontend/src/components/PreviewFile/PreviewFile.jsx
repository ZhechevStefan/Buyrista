import { useState } from "react";

import styles from "./Preview.module.css";

const PreviewFile = props => {
  const file = props.file;
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();

  reader.readAsDataURL(file);

  function isFileImage(file) {
    return file && file["type"].split("/")[0] === "image";
  }

  reader.onload = () => {
    setPreview(
      isFileImage(file) ? reader.result : "Please, enter valid image!"
    );
  };

  return (
    <div className={styles["preview-wrapper"]}>
      <div className={styles["image-wrapper"]}>
        <img src={preview} className="preview" alt="Preview" />
      </div>
      <div className={styles["label-wrapper"]}>
        <label>{file.name}</label>
      </div>
    </div>
  );
};

export default PreviewFile;
