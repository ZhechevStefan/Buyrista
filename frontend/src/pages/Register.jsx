import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import AuthContext from "../context/auth-context.jsx";
import Button from "../components/Button/Button.jsx";
import Input from "../components/Input/Input.jsx";
import { useHttpClient } from "../hooks/http-hook.jsx";
import styles from "./Form.module.css";

const RegisterPage = () => {
  // const data = useActionData();
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const sendRegister = async values => {
    clearError();
    try {
      const { user } = await sendRequest(
        "http://localhost:5000/users/register",
        "POST",
        "include",
        JSON.stringify(values),
        {
          "Content-Type": "application/json"
        }
      );
      auth.login(user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {error ? <p>{error}</p> : ""}
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
        onSubmit={values => sendRegister(values)}
        validateOnMount={true}
      >
        {formik => (
          <Form
            method="POST"
            className={`${styles.wrapper} ${styles["slide-in-right"]}`}
          >
            <div className={styles["title-wrapper"]}>
              <h2>Register</h2>
            </div>
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
            <div className={styles["button-wrapper"]}>
              <Button type="submit" disabled={!formik.isValid || isLoading}>
                {isLoading ? "Submitting..." : "SIGN UP NOW"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterPage;

// export async function action({ request }) {
//   const data = await request.formData();
//   const authData = {
//     email: data.get("email"),
//     password: data.get("password"),
//     firstName: data.get("firstName"),
//     lastName: data.get("lastName")
//   };

//   const response = await fetch("http://localhost:5000/users/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(authData)
//   });

//   if (
//     response.status === 422 ||
//     response.status === 409 ||
//     response.status === 500
//   ) {
//     return response;
//   }

//   const resData = await response.json();

//   //Cookie handle
//   return redirect("/");
// }
