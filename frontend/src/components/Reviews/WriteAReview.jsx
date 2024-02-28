import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import { useHttpClient } from "../../hooks/http-hook.jsx";
import styles from "./WriteAReview.module.css";

const WriteAReview = props => {
  const isHidden = props.isHidden;
  const productId = props.productId;
  const currUserReview = props.currUserReview;
  const userName = props.userName;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const sendReview = async values => {
    clearError();
    try {
      const address = currUserReview
        ? `http://localhost:5000/reviews/${productId}?edit=true`
        : `http://localhost:5000/reviews/${productId}`;

      const review = await sendRequest(
        address,
        "POST",
        "include",
        JSON.stringify(values),
        {
          "Content-Type": "application/json"
        }
      );
      review.review.name = userName;
      props.setNewReview(review);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getRating = (rat, formik) => {
    formik.setFieldTouched("rating", true, false);
    formik.setFieldValue("rating", rat);
  };

  const initialValues = currUserReview
    ? {
        rating: currUserReview.rating,
        title: currUserReview.title,
        comment: currUserReview.comment
      }
    : {
        rating: "",
        title: "",
        comment: ""
      };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape(
        {
          rating: Yup.number().required("Rating is required"),
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
      )}
      onSubmit={values => {
        sendReview(values);
        props.hideWriteAComment();
      }}
      validateOnMount={true}
    >
      {formik => (
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
                initialValue={initialValues.rating}
                getRating={rat => getRating(rat, formik)}
              />
            </div>

            <div style={{ display: "none" }}>
              <input name="formId" defaultValue={"reviewForm"} />
              <Input
                id="rating"
                name="rating"
                element="input"
                type="number"
                label="starRating"
                isInvalid={formik.touched.title && formik.errors.title}
                errors={formik.errors.title}
                {...formik.getFieldProps("rating")}
              />
            </div>
            <Input
              id="title"
              label="Title"
              rows="1"
              isInvalid={formik.touched.title && formik.errors.title}
              errors={formik.errors.title}
              value={initialValues.title}
              {...formik.getFieldProps("title")}
            />
            <Input
              id="comment"
              label="Comment"
              isInvalid={formik.touched.comment && formik.errors.comment}
              errors={formik.errors.comment}
              value={initialValues.comment}
              {...formik.getFieldProps("comment")}
            />
            <div className={styles.buttons}>
              <div>
                If you do not want to write a comment, you can leave us just a
                rating.
              </div>
              <Button
                type="button"
                disabled={isLoading}
                onClick={props.hideWriteAComment}
                width="6.2rem"
                withMargins
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formik.isValid || isLoading}
                width="6.2rem"
                withMargins
              >
                {isLoading ? "Submitting..." : "Send"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default WriteAReview;
