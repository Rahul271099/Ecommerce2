import React, { useContext } from "react";
import CounterContext from "./CounterContext";

export default function Counter() {
  const counterContext = useContext(CounterContext);

  return (
    <div>
      <h1>Counter: {counterContext.count}</h1>

      <button
        onClick={() => {
          counterContext.setCount(counterContext.count + 5);
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          counterContext.setCount(counterContext.count - 5);
        }}
      >
        Decrement
      </button>
    </div>
  );
}
