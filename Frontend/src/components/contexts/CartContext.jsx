import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = (props) => {
  const [products, setProducts] = useState([]);

  return (
    <>
      <CartContext.Provider value={{ products, setProducts }}>
        {props.children}
      </CartContext.Provider>
    </>
  );
};

export default CartContext;
