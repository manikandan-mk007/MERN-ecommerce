import { createContext, useEffect, useState } from "react";
import API from "../api/axiosInstance";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCartItems(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;