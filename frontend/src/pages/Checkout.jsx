import { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import AuthContext from "../context/auth-context.jsx";
import CartContext from "../context/cart-context.jsx";
import Button from "../components/Button/Button.jsx";
import Input from "../components/Input/Input.jsx";
import styles from "./Checkout.module.css";
import SummaryPage from "./Summary.jsx";

const CheckoutPage = props => {
  const [checkoutValues, setCheckoutValues] = useState(null);
  const [isSummary, setIsSummary] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const initialValues = {
    contactName: checkoutValues?.contactName || "",
    phoneNumber: checkoutValues?.phoneNumber || "",
    country: checkoutValues?.country || "Bulgaria",
    city: checkoutValues?.city || "",
    postalCode: checkoutValues?.postalCode || "",
    address: checkoutValues?.address || "",
    billingName: checkoutValues?.billingName || "",
    billingAddress: checkoutValues?.billingAddress || "",
    paymentMethod: checkoutValues?.paymentMethod || "Card Payment"
  };

  const sendToSummary = values => {
    setCheckoutValues(values);
    setIsSummary(true);
  };

  if (!isSummary) {
    return (
      <>
        <h2>Order Information</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            contactName: Yup.string()
              .trim()
              .required("All fields are required"),
            phoneNumber: Yup.string()
              .trim()
              .matches(/^\+\d+/, {
                message:
                  "Phone number must begin with + followed by country code"
              })
              .required("All fields are required"),
            country: Yup.string().trim().required("All fields are required"),
            city: Yup.string().trim().required("All fields are required"),
            postalCode: Yup.string()
              .matches(/\d+/, {
                message: "Postal code must contain only numbers"
              })
              .required("Required"),
            address: Yup.string().trim().required("All fields are required"),
            billingName: Yup.string().trim(),
            billingAddress: Yup.string().trim()
          })}
          onSubmit={values => sendToSummary(values)}
          validateOnMount={true}
        >
          {formik => (
            <Form method="POST">
              <section className={styles["info-wrapper"]}>
                <h3>Delivery Information</h3>

                <h4>Contact Person</h4>
                <div className={styles["inner-wrapper"]}>
                  <Input
                    givenClass={styles["halved"]}
                    element="input"
                    type="text"
                    id="contactName"
                    name="contactName"
                    label="First and last name"
                    isInvalid={
                      formik.touched.contactName && formik.errors.contactName
                    }
                    errors={formik.errors.contactName}
                    value={initialValues.contactName}
                    {...formik.getFieldProps("contactName")}
                  />
                  <Input
                    givenClass={styles["halved"]}
                    element="input"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    isInvalid={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    errors={formik.errors.phoneNumber}
                    value={initialValues.phoneNumber}
                    {...formik.getFieldProps("phoneNumber")}
                  />
                </div>

                <h4>Delivery Address</h4>
                <div className={styles["inner-wrapper"]}>
                  <Input
                    givenClass={styles["halved"]}
                    element="input"
                    type="text"
                    id="country"
                    name="country"
                    label="Country"
                    isInvalid={formik.touched.country && formik.errors.country}
                    errors={formik.errors.country}
                    value={initialValues.country}
                    {...formik.getFieldProps("country")}
                  />
                  <Input
                    givenClass={styles["halved"]}
                    element="input"
                    type="text"
                    id="city"
                    name="city"
                    label="City"
                    isInvalid={formik.touched.city && formik.errors.city}
                    errors={formik.errors.city}
                    value={initialValues.city}
                    {...formik.getFieldProps("city")}
                  />
                </div>
                <div className={styles["inner-wrapper"]}>
                  <Input
                    givenClass={styles["fifth"]}
                    element="input"
                    type="number"
                    id="postalCode"
                    name="postalCode"
                    label="Postal Code"
                    isInvalid={
                      formik.touched.postalCode && formik.errors.postalCode
                    }
                    errors={formik.errors.postalCode}
                    value={initialValues.postalCode}
                    {...formik.getFieldProps("postalCode")}
                  />
                  <Input
                    givenClass={styles["four-fifth"]}
                    element="input"
                    type="text"
                    id="address"
                    name="address"
                    label="Address"
                    isInvalid={formik.touched.address && formik.errors.address}
                    errors={formik.errors.address}
                    value={initialValues.address}
                    {...formik.getFieldProps("address")}
                  />
                </div>
              </section>

              <section className={styles["info-wrapper"]}>
                <h3 className={styles.billing}>Billing Information</h3>
                <p style={{ fontSize: "0.8rem" }}>
                  If you want to use the same info, you can leave these fields
                  empty.
                </p>
                <div className={styles["inner-wrapper"]}>
                  <Input
                    givenClass={styles["halved"]}
                    element="input"
                    type="text"
                    id="billingName"
                    name="billingName"
                    label="First and last name"
                    isInvalid={
                      formik.touched.billingName && formik.errors.billingName
                    }
                    errors={formik.errors.billingName}
                    value={initialValues.billingName}
                    {...formik.getFieldProps("billingName")}
                  />
                  <Input
                    givenClass={styles["halved"]}
                    element="input"
                    type="text"
                    id="otherInfo"
                    name="otherInfo"
                    label="Other Information"
                  />
                </div>
                <Input
                  givenClass={styles["full-width"]}
                  element="input"
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  label="Full Address"
                  isInvalid={
                    formik.touched.billingAddress &&
                    formik.errors.billingAddress
                  }
                  errors={formik.errors.billingAddress}
                  value={initialValues.billingAddress}
                  {...formik.getFieldProps("billingAddress")}
                />
              </section>

              <section className={styles["info-wrapper"]}>
                <h3>Payment Method</h3>
                <div className={styles["radio-wrapper"]}>
                  <Field
                    type="radio"
                    name="paymentMethod"
                    id="cardPayment"
                    value="Card Payment"
                  />
                  <label htmlFor="cardPayment">Debit/Credit Card</label>
                  <Field
                    type="radio"
                    name="paymentMethod"
                    id="cashOnDelivery"
                    value="Cash On Delivery"
                  />
                  <label htmlFor="cashOnDelivery">Cash on Delivery</label>
                </div>
              </section>

              <section className={styles["info-wrapper"]}>
                <h3>Total Order price</h3>
                <p>All products: ${cartCtx.totalAmount.toFixed(2)}</p>
                <p>
                  Payment processing fee:{" "}
                  {formik.values.paymentMethod === "Cash On Delivery"
                    ? "$2.00"
                    : "$0.00"}
                </p>
                <p>
                  Delivery Tax:{" "}
                  {cartCtx.totalAmount > 99.99 ? "$0.00" : "$10.00"}
                </p>
                {/* <p>
                  Total: $
                  {formik.values.paymentMethod === "Cash On Delivery"
                    ? (formik.values.price + 2).toFixed(2)
                    : formik.values.price.toFixed(2)}
                </p> */}
                <p>
                  Total: $
                  {(
                    cartCtx.totalAmount +
                    (formik.values.paymentMethod === "Card Payment" ? 0 : 2) +
                    (cartCtx.totalAmount > 99.99 ? 0 : 10)
                  ).toFixed(2)}
                </p>

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
  } else {
    return (
      <SummaryPage
        checkoutValues={checkoutValues}
        setIsSummary={setIsSummary}
      />
    );
  }
};

export default CheckoutPage;
