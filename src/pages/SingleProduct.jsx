import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../slices/cartSlice";

function SingleProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const [singleProduct, setSingleProduct] = useState();
  const [quantity, setQuantity] = useState(0);
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        setSingleProduct(data);
      });
  }, []);

  useEffect(() => {
    if (singleProduct) {
      const cartItem = cart.find((item) => item.id === singleProduct.id);
      if (cartItem) setQuantity(cartItem.quantity);
      else setQuantity(0);
    }
  }, [cart, singleProduct]);

  return (
    <div className="productContainer">
      <div className="productImageContainer">
        <img src={singleProduct?.image} alt={singleProduct?.title} />
      </div>
      <div className="productDetailContainer">
        <div className="productDetail">
          <h3>{singleProduct?.title}</h3>
          <p>
            <span>Description: </span>
            {singleProduct?.description}
          </p>
          <p>
            <span>Category: </span>
            {singleProduct?.category}
          </p>
          <p>
            <span>Rating: </span>
            {singleProduct?.rating.rate}
          </p>
          <p>
            <span>Price: </span>${singleProduct?.price}
          </p>
        </div>
        <div className="productActionBtns">
          <button
            className="decreaseItem"
            onClick={() => dispatch(decrement(singleProduct))}
          >
            Go Less <AiOutlineMinus />{" "}
          </button>
          <span>{quantity}</span>
          <button
            className="increaseItem"
            onClick={() => dispatch(increment(singleProduct))}
          >
            Go More <AiOutlinePlus />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
