import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import HomePage, { loadProducts } from "./pages/Home.jsx";
import ProductPage, { loadProduct } from "./pages/Product.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ErrorPage from "./pages/Error.jsx";
import UsersPage, { loader as adminUsersLoader } from "./pages/Users.jsx";
import AddProductPage, {
  action as addProductAction
} from "./pages/AddProduct.jsx";
import OrdersPage from "./pages/Orders.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
import "./index.css";

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
        loader: loadProduct
      },
      {
        path: "users/login",
        element: <LoginPage />
      },
      {
        path: "users/register",
        element: <RegisterPage />
      },
      {
        path: "users/checkout",
        element: <CheckoutPage />
      },
      {
        path: "admin/users",
        element: <UsersPage />,
        loader: adminUsersLoader
      },
      {
        path: "admin/addproduct",
        element: <AddProductPage />,
        action: addProductAction
      },
      {
        path: "admin/orders",
        element: <OrdersPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
