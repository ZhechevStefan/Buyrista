import { useRef, useState } from "react";
import { useNavigation, Form, redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Input from "../components/Input/Input.jsx";
import RefInput from "../components/Input/RefInput.jsx";
import Button from "../components/Button/Button.jsx";
import PreviewFile from "../components/PreviewFile/PreviewFile.jsx";
import styles from "./Form.module.css";
import EmptyBackground from "../components/PreviewFile/EmptyBackground.jsx";

const AddProductPage = props => {
  const [imageLoaded, setImageLoaded] = useState(null);
  const filePickerRef = useRef();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const MAX_FILE_SIZE = 102400; //100KB
  const validFileExtensions = ["jpg", "jpeg", "png"];

  const checkSizeValidity = file => {
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }

    return true;
  };

  const checkExtValidity = file => {
    const fileExt = file.type.split("/")[1];
    const legalExt = validFileExtensions.indexOf(fileExt);

    if (legalExt < 0) {
      return false;
    }

    return true;
  };

  const setValue = (formik, file) => {
    formik.setFieldTouched("image", true, false);
    formik.setFieldValue("image", file);
    setImageLoaded(file);
  };

  const pickImageHandler = () => {
    console.log(filePickerRef.current);
    filePickerRef.current.click();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        image: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        countInStock: ""
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().trim().required("All fields are required"),
        image: Yup.mixed()
          .required("All fields are required")
          .test("is-valid-size", "Max allowed size is 100KB", value => checkSizeValidity(value))
          .test("is-valid-ext", "Only .jpg, .jpeg and .png are valid extensions.", value =>
            checkExtValidity(value)
          ),
        description: Yup.string().trim().required("All fields are required"),
        brand: Yup.string().trim().required("All fields are required"),
        category: Yup.string()
          .required("All fields are required")
          .oneOf(
            ["Electronics", "Accessories", "Others"],
            "Must be one of Electronics, Accessories or Others"
          ),
        price: Yup.number().required("All fields are required").positive("Must be positive."),
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
          encType="multipart/form-data"
        >
          <div className={styles["title-wrapper"]}>
            <h2>Add a Product</h2>
          </div>
          <Input
            id="name"
            name="name"
            element="input"
            type="text"
            label="Name"
            placeholder="Name of the product"
            isInvalid={formik.touched.name && formik.errors.name}
            errors={formik.errors.name}
            {...formik.getFieldProps("name")}
          />
          <div className={styles["upload-wrapper"]}>
            {imageLoaded ? (
              <PreviewFile file={imageLoaded} errors={formik.errors.image} />
            ) : (
              <EmptyBackground url="../images/empty-background.jpg" />
            )}
            <Button type="button" onClick={pickImageHandler}>
              PICK IMAGE
            </Button>
          </div>
          <div style={{ display: "none" }}>
            <RefInput
              id="image"
              element="input"
              label="Image"
              ref={filePickerRef}
              onChange={event => setValue(formik, event.target.files[0])}
              isInvalid={formik.touched.image && formik.errors.image}
              // errors={formik.errors.image}
            />
          </div>
          <Input
            id="description"
            label="Description"
            isInvalid={formik.touched.description && formik.errors.description}
            errors={formik.errors.description}
            {...formik.getFieldProps("description")}
          />
          <Input
            id="brand"
            name="brand"
            element="input"
            type="text"
            label="Brand"
            placeholder="Brand of the product"
            isInvalid={formik.touched.brand && formik.errors.brand}
            errors={formik.errors.brand}
            {...formik.getFieldProps("brand")}
          />
          <Input
            id="category"
            element="select"
            label="Category"
            options={["Electronics", "Accessories", "Others"]}
            isInvalid={formik.touched.category && formik.errors.category}
            errors={formik.errors.category}
            {...formik.getFieldProps("category")}
          />
          <Input
            id="price"
            name="price"
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
            name="countInStock"
            element="input"
            type="number"
            label="Count In Stock"
            placeholder="The count of the product in stock"
            isInvalid={formik.touched.countInStock && formik.errors.countInStock}
            errors={formik.errors.countInStock}
            {...formik.getFieldProps("countInStock")}
          />
          <div className={styles["button-wrapper"]}>
            <Button type="submit" disabled={!formik.isValid || isSubmitting}>
              {isSubmitting ? "Submitting..." : "ADD PRODUCT"}
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

  const response = await fetch("http://web.lvh.me/api/admin/addproduct", {
    method: "POST",
    credentials: "include",
    body: data
  });

  if (response.status === 401 || response.status === 500) {
    return response;
  }

  const { productId } = await response.json();

  return redirect(`/products/${productId}`);
}
