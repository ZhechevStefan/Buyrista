import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
  redirect
} from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Input from "../components/Input/Input.jsx";
import Button from "../components/Button/Button.jsx";
import styles from "./Register.module.css";

const RegisterPage = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().trim().required("All fields are required"),
        lastName: Yup.string().trim().required("All fields are required"),
        email: Yup.string()
          .trim()
          .email("Invalid email address")
          .required("All fields are required"),
        password: Yup.string()
          .trim()
          .required("All fields are required")
          .min(6, "Password must be at least 6 characters long")
      })}
      validateOnMount={true}
      onSubmit={async values => {
        submit(values, { method: "POST" });
      }}
    >
      {formik => (
        <Form method="POST" className={styles["form-control"]}>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map(err => {
                return <li key={err}>{err}</li>;
              })}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
          <Input
            id="firstName"
            element="input"
            type="text"
            label="First name"
            placeholder="First name"
            isInvalid={formik.touched.firstName && formik.errors.firstName}
            errors={formik.errors.firstName}
            {...formik.getFieldProps("firstName")}
          />
          <Input
            id="lastName"
            element="input"
            type="text"
            label="Last name"
            placeholder="Last name"
            isInvalid={formik.touched.lastName && formik.errors.lastName}
            errors={formik.errors.lastName}
            {...formik.getFieldProps("lastName")}
          />
          <Input
            id="email"
            element="input"
            type="text"
            label="Email"
            placeholder="Your email"
            isInvalid={formik.touched.email && formik.errors.email}
            errors={formik.errors.email}
            {...formik.getFieldProps("email")}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            placeholder="Password"
            isInvalid={formik.touched.password && formik.errors.password}
            errors={formik.errors.password}
            {...formik.getFieldProps("password")}
          />
          {/* <Input
        id="confirm-password"
        element="input"
        type="passowrd"
        label="Confirm Password"
        placeholder="Confirm Passowrd"
        {...formik.getFieldProps("password")}
      /> */}
          <Button disabled={!formik.isValid || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    firstName: data.get("firstName"),
    lastName: data.get("lastName")
  };

  const response = await fetch("http://localhost:5000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authData)
  });

  if (
    response.status === 422 ||
    response.status === 409 ||
    response.status === 500
  ) {
    return response;
  }

  const resData = await response.json();

  //Cookie handle
  return redirect("/");
}
