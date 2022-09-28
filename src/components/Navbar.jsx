import { BsCart2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import { toggleCartOpen } from "../slices/cartSlice";

function Navbar() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <h1>All Star Store</h1>
      <div className="cartBtn" onClick={() => dispatch(toggleCartOpen())}>
        <BsCart2 />
        <span>{totalQuantity}</span>
      </div>
      <Cart />
    </div>
  );
}

export default Navbar;
