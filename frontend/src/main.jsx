import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import HomePage, { loadProducts } from "./pages/Home.jsx";
import ProductPage, { loadProduct } from "./pages/Product.jsx";
import LoginPage, { action as loginAction } from "./pages/Login.jsx";
import RegisterPage, { action as registerAction } from "./pages/Register.jsx";
import { action as postReviewAction } from "./components/Reviews/WriteAReview.jsx";
import ErrorPage from "./pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: loadProducts
      },
      {
        path: "products/:productId",
        element: <ProductPage />,
        loader: loadProduct,
        action: postReviewAction
      },
      {
        path: "users/login",
        element: <LoginPage />,
        action: loginAction
      },
      {
        path: "users/register",
        element: <RegisterPage />,
        action: registerAction
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
