import { useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CartProvider from "./context/cartProvider.jsx";
import AuthProvider from "./context/authProvider.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Backdrop from "./components/Backdrop/Backdrop.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    toast.dismiss();
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <AuthProvider>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        {cartIsShown && <Backdrop onClick={hideCartHandler} dark />}
        <Header onShowCart={showCartHandler} />
        <Notifications />
        <main>
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
