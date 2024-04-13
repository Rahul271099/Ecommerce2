import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Products from "./components/Products";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./components/AddProduct";
import Counter from "./components/Counter";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* <Counter /> */}
    </>
  );
}

export default App;
