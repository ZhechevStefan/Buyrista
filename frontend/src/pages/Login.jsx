import { useContext } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import AuthContext from "../context/auth-context.jsx";
import CartContext from "../context/cart-context.jsx";
import FavContext from "../context/fav-context.jsx";
import Input from "../components/Input/Input.jsx";
import Button from "../components/Button/Button.jsx";
import { useHttpClient } from "../hooks/http-hook.jsx";
import styles from "./Form.module.css";

const LoginPage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const favs = useContext(FavContext);

  const navigate = useNavigate();

  const sendLogin = async values => {
    clearError();

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
    user.carts.map(cartItem => {
      const item = {
        id: cartItem.productId,
        name: cartItem.product.name,
        quantity: cartItem.count,
        countInStock: cartItem.product.countInStock - 1,
        price: cartItem.product.price,
        image: cartItem.product.imageData,
        imageType: cartItem.product.imageType
      };
      cart.addItem(item);
    });
    user.favourites.map(favItem => {
      const item = {
        id: favItem.productId,
        name: favItem.product.name,
        countInStock: favItem.product.countInStock - 1,
        price: favItem.product.price,
        image: favItem.product.imageData,
        imageType: favItem.product.imageType
      };
      favs.addFav(item);
    });

    navigate("/");
  };

  return (
    <>
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
          <Form
            method="POST"
            className={`${styles.wrapper} ${styles["slide-in-right"]}`}
          >
            <div className={styles["title-wrapper"]}>
              <h2>Login</h2>
            </div>
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
            <div className={styles["button-wrapper"]}>
              <Button type="submit" disabled={!formik.isValid || isLoading}>
                {isLoading ? "Submitting..." : "LOG IN NOW"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;
