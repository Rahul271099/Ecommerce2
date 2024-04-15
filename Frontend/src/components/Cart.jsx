import React, { useContext } from "react";
import ProductBuyCard from "./ProductBuyCart";
import UserContext from "./contexts/UserContext";

export default function Cart() {
  const userContext = useContext(UserContext);

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
        {userContext.user.productsInCart.map((product) => {
          return <ProductBuyCard details={product} />;
        })}
      </div>
    </>
  );
}
