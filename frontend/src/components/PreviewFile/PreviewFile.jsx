import { useState } from "react";

import styles from "./Preview.module.css";

const PreviewFile = ({ file, width, height }) => {
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();

  reader.readAsDataURL(file);

  function isFileImage(file) {
    return file && file["type"].split("/")[0] === "image";
  }

  reader.onload = () => {
    setPreview(isFileImage(file) ? reader.result : "/default.svg");
  };

  return (
    <div className={styles["preview-wrapper"]}>
      <img
        src={preview}
        className="preview"
        alt="Preview"
        width={width}
        height={height}
      />
      <label>{file.name}</label>
    </div>
  );
};

export default PreviewFile;
