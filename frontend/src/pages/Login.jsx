import { useContext } from "react";
import { Form, useActionData, redirect, useNavigation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import AuthProvider from "../context/authProvider.jsx";
import Input from "../components/Input/Input.jsx";
import Button from "../components/Button/Button.jsx";

const LoginPage = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Yup.object({
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
    >
      {formik => (
        <Form method="POST">
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map(err => {
                return <li key={err}>{err}</li>;
              })}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
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
          <Button type="submit" disabled={!formik.isValid || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password")
  };

  const response = await fetch("http://localhost:5000/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authData)
  });

  if (response.status === 401 || response.status === 500) {
    return response;
  }

  const { user } = await response.json();
  AuthProvider.login(user);

  return redirect("/");
}
