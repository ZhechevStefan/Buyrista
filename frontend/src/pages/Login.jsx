import { Form, useActionData, redirect, useNavigation } from "react-router-dom";

import useForm from "../hooks/form-hook.jsx";
import Input from "../components/Input/Input.jsx";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../util/validators.js";
import Button from "../components/Button/Button.jsx";

const LoginPage = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [formState, inputChangeHandler] = useForm(
    {
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
        errorText="Please enter a valid email!"
        onChange={inputChangeHandler}
        validators={[VALIDATOR_EMAIL()]}
      />
      <Input
        id="password"
        element="input"
        type="password"
        label="Password"
        placeholder="Your Password"
        errorText="Please enter a valid password!"
        onChange={inputChangeHandler}
        validators={[VALIDATOR_MINLENGTH(6)]}
      />
      <Button disabled={!formState.isValid || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Save"}
      </Button>
    </Form>
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
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authData)
  });

  if (response.status === 401 || response.status === 500) {
    return response;
  }

  const resData = await response.json();

  //Cookie handle
  return redirect("/");
}
