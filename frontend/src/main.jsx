import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import AdminRoute from "./components/ProtectRoute/AdminRoute.jsx";
import AddProductPage, { action as addProductAction } from "./pages/AddProduct.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
import ErrorPage from "./pages/Error.jsx";
import HomePage, { loadProducts } from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import OrdersPage from "./pages/Orders.jsx";
import ProtectedRoute from "./components/ProtectRoute/ProtectRoute.jsx";
import ProductPage, { loadProduct } from "./pages/Product.jsx";
import RegisterPage from "./pages/Register.jsx";
import SearchPage, { loadSearchedProducts } from "./pages/SearchPage.jsx";
import UsersPage from "./pages/Users.jsx";
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
        path: "search",
        element: <SearchPage />,
        loader: loadSearchedProducts
      },
      {
        path: "products/:productId",
        element: <ProductPage />,
        loader: loadProduct
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        )
      },
      {
        path: "admin/users",
        element: (
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        )
      },
      {
        path: "admin/addproduct",
        element: (
          <AdminRoute>
            <AddProductPage />
          </AdminRoute>
        ),
        action: addProductAction
      },
      {
        path: "admin/orders",
        element: (
          <AdminRoute>
            <OrdersPage />
          </AdminRoute>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
