import { Form, useActionData, redirect, useNavigation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Input from "../components/Input/Input.jsx";
import Button from "../components/Button/Button.jsx";
import { useHttpClient } from "../hooks/http-hook.jsx";
import styles from "./Form.module.css";

const AddProductPage = props => {
  // const data = useActionData();
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const MAX_FILE_SIZE = 102400; //100KB
  const validFileExtensions = {
    image: ["jpg", "jpeg", "png"]
  };

  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
  }

  // const getRating = rat => {
  //   formik.setFieldTouched("starRating", true, false);
  //   formik.setFieldValue("starRating", rat);
  // };

  return (
    <Formik
      initialValues={{
        name: "",
        // image: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        countInStock: ""
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().trim().required("All fields are required"),
        // image: Yup.mixed()
        //   .required("All fields are required")
        //   .test("is-valid-type", "Not a valid image type", value =>
        //     isValidFileType(value && value.name.toLowerCase(), "image")
        //   )
        //   .test(
        //     "is-valid-size",
        //     "Max allowed size is 100KB",
        //     value => value && value.size <= MAX_FILE_SIZE
        //   ),
        description: Yup.string().trim().required("All fields are required"),
        brand: Yup.string().trim().required("All fields are required"),
        category: Yup.string()
          .required("All fields are required")
          .oneOf(
            ["Electronics", "Accessories", "Others"],
            "Must be one of Electronics, Accessories or Others"
          ),
        price: Yup.number()
          .required("All fields are required")
          .positive("Must be positive."),
        countInStock: Yup.number()
          .required("All fields are required")
          .min(1, "Must be at least 1.")
          .integer("Must be integer.")
      })}
      validateOnMount={true}
    >
      {formik => (
        <Form
          method="POST"
          className={`${styles.wrapper} ${styles["slide-in-right"]}`}
        >
          <div className={styles["title-wrapper"]}>
            <h2>Add a Product</h2>
          </div>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            placeholder="Name of the product"
            isInvalid={formik.touched.name && formik.errors.name}
            errors={formik.errors.name}
            {...formik.getFieldProps("name")}
          />
          <Input
            id="image"
            element="input"
            type="file"
            label="Image"
            placeholder="Upload an image for the product"
            // isInvalid={formik.touched.image && formik.errors.image}
            // errors={formik.errors.image}
            // {...formik.getFieldProps("image")}
          />
          <Input
            id="description"
            label="Description"
            isInvalid={formik.touched.description && formik.errors.description}
            errors={formik.errors.description}
            {...formik.getFieldProps("description")}
          />
          <Input
            id="brand"
            element="input"
            type="text"
            label="Brand"
            placeholder="Brand of the product"
            isInvalid={formik.touched.brand && formik.errors.brand}
            errors={formik.errors.brand}
            {...formik.getFieldProps("brand")}
          />
          <div style={{ display: "none" }}>
            <Input
              id="category"
              element="input"
              type="text"
              label="category"
              isInvalid={formik.touched.category && formik.errors.category}
              errors={formik.errors.category}
              {...formik.getFieldProps("category")}
            />
          </div>
          <Input
            id="category"
            element="select"
            options={["Electronics", "Accessories", "Others"]}
          />
          {/* <div>
          <label htmlFor="category">Choose a category:</label>
          <select id="category" name="category">
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Others">Others</option>
          </select>
          </div> */}

          <Input
            id="price"
            element="input"
            type="number"
            label="Price"
            placeholder="Price of the product"
            isInvalid={formik.touched.price && formik.errors.price}
            errors={formik.errors.price}
            {...formik.getFieldProps("price")}
          />
          <Input
            id="countInStock"
            element="input"
            type="number"
            label="Count In Stock"
            placeholder="The count of the product in stock"
            isInvalid={
              formik.touched.countInStock && formik.errors.countInStock
            }
            errors={formik.errors.countInStock}
            {...formik.getFieldProps("countInStock")}
          />
          {/* <Button type="submit" disabled={!formik.isValid || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </Button> */}
          <div className={styles["button-wrapper"]}>
            <Button type="submit" disabled={!formik.isValid || isLoading}>
              {isLoading ? "Submitting..." : "Save"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductPage;

export async function action({ request }) {
  const data = await request.formData();
  const product = {
    name: data.get("name"),
    description: data.get("description"),
    brand: data.get("brand"),
    category: data.get("category"),
    price: data.get("price"),
    countInStock: data.get("countInStock")
  };

  console.log(product);
  // const response = await fetch("http://localhost:5000/users/login", {
  //   method: "POST",
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(authData)
  // });

  // if (response.status === 401 || response.status === 500) {
  //   return response;
  // }

  // const resData = await response.json();

  // //Cookie handle
  // return redirect("/");
}
