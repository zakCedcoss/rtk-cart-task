import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTypeH1 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartOpen, increment, decrement } from "../slices/cartSlice";

function Cart() {
  const { isOpen, cart, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  return (
    <div className={isOpen ? "cartContainer" : "cartContainer closing"}>
      <div className="cartHead">
        <h3>My Cart</h3>
        <div className="cartClose" onClick={() => dispatch(toggleCartOpen())}>
          <AiOutlineClose />
        </div>
      </div>
      <div className="cartBodyContainer">
        {cart.length === 0 && <h1>No Items in Cart</h1>}
        {cart.map((item) => (
          <div className="cartBody" key={item.id}>
            <div className="cartBodyImg">
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </div>
            <div className="cartActionBtns">
              <button
                className="decreaseItem"
                onClick={() => dispatch(decrement(item))}
              >
                <AiOutlineMinus />
              </button>
              <span>{item.quantity}</span>
              <button
                className="increaseItem"
                onClick={() => dispatch(increment(item))}
              >
                <AiOutlinePlus />
              </button>
            </div>
            <div className="amount">
              <div className="itemQuantity">
                <span>{item.quantity} item(s)</span>
              </div>
              <div className="itemAmount">
                <span>Price: ${item.quantity * item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cartFooter">
        <div className="totalQuantity">{totalQuantity} Item(s) in Cart</div>
        <div className="totalPrice">Total Price: ${totalPrice.toFixed(2)}</div>
        <div className="footerBtn">
          <button disabled={cart.length === 0 ? true : false}>
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
