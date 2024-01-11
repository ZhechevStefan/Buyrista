import { useNavigation, Form } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Input from "../Input/Input.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import Button from "../Button/Button.jsx";
import styles from "./WriteAReview.module.css";

const WriteAReview = props => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isHidden = props.isHidden;

  const formik = useFormik({
    initialValues: {
      starRating: "",
      title: "",
      comment: ""
    },
    validationSchema: Yup.object().shape(
      {
        starRating: Yup.number().required("Rating is required"),
        comment: Yup.string()
          .trim()
          .when("title", {
            is: ttl => !!ttl,
            then: () =>
              Yup.string().required(
                "Comment is required when you have a title."
              )
          }),
        title: Yup.string()
          .trim()
          .when("comment", {
            is: comm => !!comm,
            then: () =>
              Yup.string().required(
                "Title is required when you write a comment."
              )
          })
      },
      [["title", "comment"]]
    ),
    validateOnMount: true
  });

  const getRating = rat => {
    formik.setFieldTouched("starRating", true, false);
    formik.setFieldValue("starRating", rat);
  };

  //

  return (
    <div
      className={styles["form-wrapper"]}
      style={isHidden ? { display: "none" } : { display: "block" }}
    >
      <Form method="POST">
        <div className={styles["title"]}>Write a Customer Review</div>
        <div className={styles["rating"]}>
          <div>Your Rating:</div>
          <StarRating
            readOnly={false}
            allowFraction={false}
            getRating={getRating}
          />
        </div>

        <div style={{ display: "none" }}>
          <input name="formId" defaultValue={"reviewForm"} />
          <Input
            id="starRating"
            element="input"
            type="number"
            label="starRating"
            isInvalid={formik.touched.title && formik.errors.title}
            errors={formik.errors.title}
            {...formik.getFieldProps("starRating")}
          />
        </div>
        <Input
          id="title"
          label="Title"
          rows="1"
          isInvalid={formik.touched.title && formik.errors.title}
          errors={formik.errors.title}
          {...formik.getFieldProps("title")}
        />
        <Input
          id="comment"
          label="Comment"
          isInvalid={formik.touched.comment && formik.errors.comment}
          errors={formik.errors.comment}
          {...formik.getFieldProps("comment")}
        />
        <div className={styles.buttons}>
          <div>
            If you do not want to write a comment, you can leave us just a
            rating.
          </div>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={props.hideWriteAComment}
          >
            Cancel
          </Button>
          <Button disabled={!formik.isValid || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default WriteAReview;
