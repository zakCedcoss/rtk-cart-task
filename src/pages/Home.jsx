import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  //   const store = useSelector((state) => state.cart);
  //   console.log(store);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="imgContainer">
      {products.map((product) => {
        return (
          <div className="imgWrapper" key={product.id}>
            <Link to={`${product.id}`}>
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
