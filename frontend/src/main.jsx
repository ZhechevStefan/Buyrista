import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import HomePage, { loadProducts } from "./pages/Home.jsx";
import ProductPage, {
  loadProduct,
  action as productActions
} from "./pages/Product.jsx";
import LoginPage, { action as loginAction } from "./pages/Login.jsx";
import RegisterPage, { action as registerAction } from "./pages/Register.jsx";
import ErrorPage from "./pages/Error.jsx";
import UsersPage, { loader as adminUsersLoader } from "./pages/Users.jsx";
import AddProductPage from "./pages/AddProduct.jsx";
import OrdersPage from "./pages/Orders.jsx";

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
        action: productActions
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
      },
      {
        path: "admin/users",
        element: <UsersPage />,
        loader: adminUsersLoader
      },
      {
        path: "admin/addproduct",
        element: <AddProductPage />
      },
      {
        path: "admin/orders",
        element: <OrdersPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
