import { Form } from "react-router-dom";

import useForm from "../hooks/form-hook.jsx";
import Input from "../components/Input/Input.jsx";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../util/validators.js";
import Button from "../components/Button/Button.jsx";

const LoginPage = () => {
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
    <Form>
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
      <Button disabled={!formState.isValid}>Save</Button>
    </Form>
  );
};

export default LoginPage;
