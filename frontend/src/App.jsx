import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CartProvider from "./context/cartProvider.jsx";
import AuthProvider from "./context/authProvider.jsx";
import FavProvider from "./context/favProvider.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <FavProvider>
            <Notifications />
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </FavProvider>
        </CartProvider>
      </AuthProvider>
      <ScrollRestoration />
    </>
  );
}

export default App;
