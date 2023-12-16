import {
  Form,
  useActionData,
  useNavigation,
  json,
  redirect
} from "react-router-dom";

import Input from "../components/Input/Input.jsx";
import useForm from "../hooks/form-hook.jsx";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../util/validators.js";
import Button from "../components/Button/Button.jsx";
import styles from "./Register.module.css";

const RegisterPage = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [formState, inputChangeHandler] = useForm(
    {
      firstName: {
        value: "",
        isValid: false
      },
      lastName: {
        value: "",
        isValid: false
      },
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  return (
    <Form method="post" className={styles["form-control"]}>
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
        errorText="Please enter a valid name!"
        onChange={inputChangeHandler}
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        id="lastName"
        element="input"
        type="text"
        label="Last name"
        placeholder="Last name"
        errorText="Please enter a valid name!"
        onChange={inputChangeHandler}
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        id="email"
        element="input"
        type="text"
        label="Email"
        placeholder="Your email"
        errorText="Please enter a valid email!"
        onChange={inputChangeHandler}
        validators={[VALIDATOR_EMAIL()]}
      />
      <Input
        id="password"
        element="input"
        type="password"
        label="Password"
        placeholder="Password"
        errorText="Please enter a valid password!"
        onChange={inputChangeHandler}
        validators={[VALIDATOR_MINLENGTH(6)]}
      />
      {/* <Input
        id="confirm-password"
        element="input"
        type="passowrd"
        label="Confirm Password"
        placeholder="Confirm Passowrd"
        errorText="Both Passwords are different!"
        onChange={inputChangeHandler}
        validators={[VALIDATOR_MINLENGTH(6)]}
      /> */}
      <Button disabled={!formState.isValid || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Save"}
      </Button>
    </Form>
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

  const response = await fetch("http://localhost:5000/register", {
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
