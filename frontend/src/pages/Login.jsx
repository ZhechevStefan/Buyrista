import { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Input from "../components/Input/Input.jsx";
import Button from "../components/Button/Button.jsx";
import { useHttpClient } from "../hooks/http-hook.jsx";
import AuthContext from "../context/auth-context.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // const data = useActionData();
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const sendLogin = async values => {
    clearError();
    try {
      const { user } = await sendRequest(
        "http://localhost:5000/users/login",
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
        onSubmit={values => sendLogin(values)}
        validateOnMount={true}
      >
        {formik => (
          <Form method="POST">
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
            <Button type="submit" disabled={!formik.isValid || isLoading}>
              {isLoading ? "Submitting..." : "Save"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;

// export async function action({ request }) {
//   const data = await request.formData();
//   const authData = {
//     email: data.get("email"),
//     password: data.get("password")
//   };

//   const response = await fetch("http://localhost:5000/users/login", {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(authData)
//   });

//   if (response.status === 401 || response.status === 500) {
//     return response;
//   }

//   let { user } = await response.json();

//   localStorage.setItem("userInfo", JSON.stringify(user));

//   return redirect("/");
// }
