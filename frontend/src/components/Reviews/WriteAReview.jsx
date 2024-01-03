import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useState } from "react";
import { Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";

import Input from "../Input/Input.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import Button from "../Button/Button.jsx";

const WriteAReview = () => {
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";
  const [rating, setRating] = useState(0);

  const formik = useFormik({
    initialValues: {
      starRating: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      starRating: Yup.number().required("Rating is required"),
      title: Yup.string().trim().required("All fields are required"),
      comment: Yup.string().trim().required("All fields are required")
    }),
    validateOnMount: true,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  const getRating = rat => {
    setRating(rat);
    formik.setFieldValue("starRating", rat);
    formik.setFieldTouched("starRating");
  };

  return (
    <Form method="POST">
      <div>Write a Customer Review</div>
      <StarRating
        readOnly={false}
        allowFraction={false}
        getRating={getRating}
      />
      <div style={{ display: "none" }}>
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
      <Button disabled={!formik.isValid || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Save"}
      </Button>
    </Form>
  );
};

export default WriteAReview;
