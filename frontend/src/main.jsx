import React from "react";
import "./utils/extensions.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/cardContenxt.jsx";
import { NotiProvider } from "./context/notificationContenxt.jsx";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./views/error-page.jsx";
import Login from "./pages/users/login.jsx";
import Orders from "./pages/orders/orders.jsx";
import Cart from "./pages/cart/cart.jsx";
import Products from "./pages/products/products.jsx";
import Users from "./pages/users/users.jsx";
import UserForm from "./pages/users/user-form.jsx";
import ProductForm from "./pages/products/product-form.jsx";
import Gallery from "./pages/gallery/gallery.jsx";
import Detail from "./pages/gallery/detail.jsx";
import Checkout from "./pages/checkout/checkout.jsx";
import ThankYou from "./pages/thankyou";

import { user, users } from "./pages/users/loader.js";
import { product, products } from "./pages/products/loader.js";
import { shipping } from "./pages/checkout/loader.js";
import { orders, order } from "./pages/orders/loader.js";
import { ordersDetail } from "./pages/thankyou/loader.js";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Gallery />,
        loader: products,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "orders",
        element: <Orders />,
        loader: orders,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "products",
        element: <Products />,
        loader: products,
      },
      {
        path: "addproduct",
        element: <ProductForm />,
        loader: product,
      },
      {
        path: "editproduct/:productId",
        element: <ProductForm />,
        loader: product,
      },
      {
        path: "product-detail/:productId",
        element: <Detail />,
        loader: product,
      },
      {
        path: "users",
        element: <Users />,
        loader: users,
      },
      {
        path: "adduser",
        element: <UserForm />,
        loader: user,
      },
      {
        path: "edituser/:userId",
        element: <UserForm />,
        loader: user,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: shipping,
      },
      {
        path: "thankyou/:orderId",
        element: <ThankYou />,
        loader: ordersDetail,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <NotiProvider>
        <RouterProvider router={router} />
      </NotiProvider>
    </CartProvider>
  </React.StrictMode>
);
