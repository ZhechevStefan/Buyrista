import { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import AuthContext from "../context/auth-context.jsx";
import CartContext from "../context/cart-context.jsx";
import Button from "../components/Button/Button.jsx";
import Input from "../components/Input/Input.jsx";
import styles from "./Checkout.module.css";

const CheckoutPage = props => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const initialValues = {
    contactName: authCtx.name,
    phone: "",
    country: "Bulgaria",
    city: "",
    postalCode: "",
    address: "",
    billingName: authCtx.name,
    billingAddress: "",
    paymentMethod: ""
  };

  return (
    <>
      <h2>Order Information</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          contactName: Yup.string().trim().required("All fields are required"),
          phone: Yup.string()
            .trim()
            .matches(/^\+\d+/, {
              message: "Phone number must begin with + followed by country code"
            })
            .required("All fields are required"),
          country: Yup.string().trim().required("All fields are required"),
          city: Yup.string().trim().required("All fields are required"),
          postalCode: Yup.number()
            .matches(/\d+/, {
              message: "Postal code must contain only numbers"
            })
            .required("All fields are required"),
          address: Yup.string().trim().required("All fields are required"),
          billingName: Yup.string().trim().required("All fields are required"),
          billingAddress: Yup.string()
            .trim()
            .required("All fields are required"),
          paymentMethod: Yup.string().required("All fields are required")
        })}
        onSubmit={values => console.log(values)}
        validateOnMount={true}
      >
        {formik => (
          <Form>
            <section>
              <h3>Delivery Information</h3>
              <h4>Contact Person</h4>
              <Input
                id="contact-name"
                element="input"
                type="text"
                label="Name"
                isInvalid={
                  formik.touched.contactName && formik.errors.contactName
                }
                errors={formik.errors.contactName}
                value={initialValues.contactName}
                {...formik.getFieldProps("contactName")}
              />
              <Input
                id="phone-number"
                element="input"
                type="text"
                label="Phone Number"
                isInvalid={formik.touched.phone && formik.errors.phone}
                errors={formik.errors.phone}
                value={initialValues.phone}
                {...formik.getFieldProps("phone")}
              />
              <h4>Delivery Address</h4>
              <Input
                id="country"
                element="input"
                type="text"
                label="Country"
                isInvalid={formik.touched.country && formik.errors.country}
                errors={formik.errors.country}
                value={initialValues.country}
                {...formik.getFieldProps("country")}
              />
              <Input
                id="city"
                element="input"
                type="text"
                label="City"
                isInvalid={formik.touched.city && formik.errors.city}
                errors={formik.errors.city}
                value={initialValues.city}
                {...formik.getFieldProps("city")}
              />
              <Input
                id="postal-code"
                element="input"
                type="number"
                label="Postal Code"
                isInvalid={
                  formik.touched.postalCode && formik.errors.postalCode
                }
                errors={formik.errors.postalCode}
                value={initialValues.postalCode}
                {...formik.getFieldProps("postalCode")}
              />
              <Input
                id="address"
                element="input"
                type="text"
                label="Address"
                isInvalid={formik.touched.address && formik.errors.address}
                errors={formik.errors.address}
                value={initialValues.address}
                {...formik.getFieldProps("address")}
              />
            </section>
            <section>
              <h3>Billing Information</h3>
              <Input
                id="billing-name"
                element="input"
                type="text"
                label="Name"
                isInvalid={
                  formik.touched.billingName && formik.errors.billingName
                }
                errors={formik.errors.billingName}
                value={initialValues.billingName}
                {...formik.getFieldProps("billingName")}
              />
              <Input
                id="billing-address"
                element="input"
                type="text"
                label="Address"
                isInvalid={
                  formik.touched.billingAddress && formik.errors.billingAddress
                }
                errors={formik.errors.billingAddress}
                value={initialValues.billingAddress}
                {...formik.getFieldProps("billingAddress")}
              />
            </section>
            <section>
              <h3>Payment Method</h3>
              <Input
                id="cardPayment"
                name="paymentMethod"
                element="input"
                type="radio"
                label="Debit/Credit Card"
                isInvalid={
                  formik.touched.cardPayment && formik.errors.cardPayment
                }
                errors={formik.errors.cardPayment}
                value={"cardPayment"}
                {...formik.getFieldProps("cardPayment")}
              />
              <Input
                id="cashOnDelivery"
                name="paymentMethod"
                element="input"
                type="radio"
                label="Cash on Delivery"
                isInvalid={
                  formik.touched.cashOnDelivery && formik.errors.cashOnDelivery
                }
                errors={formik.errors.cashOnDelivery}
                value={"cashOnDelivery"}
                {...formik.getFieldProps("cashOnDelivery")}
              />
            </section>
            <section>
              <h3>Total Order price</h3>
              <p>All products: {cartCtx.totalAmount}</p>
              <p>
                Payment processing fee:
                {formik.values.paymentMethod === "cashOnDelivery" ? "2$" : "0$"}
              </p>
              <p>Delivery Tax: {cartCtx.totalAmount > 99.99 ? "0$" : "10$"}</p>
              <p>Total:</p>
              <div className={styles["button-wrapper"]}>
                <Button type="submit" disabled={!formik.isValid}>
                  Continue to Overview
                </Button>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CheckoutPage;
