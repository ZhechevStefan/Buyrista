import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CartProvider from "./context/cartProvider.jsx";
import AuthProvider from "./context/authProvider.jsx";
import FavProvider from "./context/favProvider.jsx";
import AuthContext from "./context/auth-context.jsx";
import CartContext from "./context/cart-context.jsx";
import FavContext from "./context/fav-context.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Backdrop from "./components/Backdrop/Backdrop.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const favCtx = useContext(FavContext);

  const showCartHandler = () => {
    toast.dismiss();
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  useEffect(() => {
    async function checkIfLogged() {
      let storedData = localStorage.getItem("userInfo");
      if (storedData) {
        storedData = JSON.parse(localStorage.getItem("userInfo"));
        const response = await authCtx.isItLogged();
        if (response) {
          authCtx.login(storedData);
        } else {
          authCtx.logout();
          cartCtx.clearCart();
          favCtx.clearFavs();
        }
      }
    }
    checkIfLogged();
  }, [authCtx, favCtx, cartCtx]);

  return (
    <AuthProvider>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        {cartIsShown && <Backdrop onClick={hideCartHandler} dark />}
        <FavProvider>
          <Header onShowCart={showCartHandler} />
          <Notifications />
          <main>
            <Outlet />
          </main>
          <Footer />
        </FavProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
