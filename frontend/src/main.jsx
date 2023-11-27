import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/Home.jsx";
import ProductPage from "./pages/Product.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "products/:productId",
        element: <ProductPage />
      },
      {
        path: "users/login",
        element: <LoginPage />
      },
      {
        path: "users/register",
        element: <RegisterPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
