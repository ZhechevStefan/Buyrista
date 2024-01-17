import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";

import styles from "./Example.module.css";
import PreviewFile from "../components/PreviewFile/PreviewFile.jsx";

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"]
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

function getAllowedExt(type) {
  return validFileExtensions[type].map(e => `.${e}`).toString();
}

const MAX_FILE_SIZE = 102400;

const Schema = Yup.object().shape({
  image: Yup.mixed()
    .required("Required")
    .test("is-valid-type", "Not a valid image type", value =>
      isValidFileType(value && value.name.toLowerCase(), "image")
    )
    .test(
      "is-valid-size",
      "Max allowed size is 100KB",
      value => value && value.size <= MAX_FILE_SIZE
    )
});

export default function Example() {
  const handleSubmit = values => {
    console.log(values);
  };

  const renderUploadButton = (formik, errors, inputName) => {
    let allowedExts = getAllowedExt(inputName);
    return (
      <>
        <div className={styles["button-wrap"]}>
          <label className={styles["button label"]} htmlFor={inputName}>
            <span>Upload {inputName}</span>
            <span className={styles["ext"]}>[{allowedExts}]</span>
          </label>
          <input
            id={inputName}
            name={inputName}
            type="file"
            accept={allowedExts}
            onChange={event => {
              formik.setFieldValue(inputName, event.currentTarget.files[0]);
            }}
          />
          {formik.values[inputName] ? (
            <PreviewFile
              className={{ margin: "auto" }}
              width={50}
              height={"auto"}
              file={formik.values[inputName]}
            />
          ) : null}
        </div>
        <div className={styles["error"]}>
          <ErrorMessage name={inputName} />
        </div>
      </>
    );
  };

  return (
    <div className={styles["App"]}>
      <Formik
        initialValues={{
          image: "",
          doc: "",
          video: null,
          zip: ""
        }}
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        {(formik, errors, touched) => (
          <Form className={styles["form-container"]}>
            {renderUploadButton(formik, errors, "image")}
            <hr />

            <button type="submit" className={styles["button submit"]}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
