import React, { useContext } from "react";
import CartContext from "./contexts/CartContext";
import ProductBuyCard from "./ProductBuyCart";

export default function Cart() {
  const cartContext = useContext(CartContext);

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <h1>Products in cart</h1>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {cartContext.products.map((product) => {
          return <ProductBuyCard details={product} />;
        })}
      </div>
    </>
  );
}
