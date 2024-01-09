import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CartProvider from "./context/cartProvider.jsx";

function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
