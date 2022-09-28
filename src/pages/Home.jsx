import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const API = "https://fakestoreapi.com/products/";
  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const filters = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  useEffect(() => {
    let query = "";
    if (selectedFilter) {
      query = "category/" + selectedFilter;
    }
    fetch(API + query)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [selectedFilter]);

  return (
    <div className="home">
      <div className="filterContainer">
        <span>Filters: </span>
        <select
          className="filter"
          onChange={(e) => setSelectedFilter(e.target.value)}
          value={selectedFilter}
        >
          <option value="">NONE</option>
          {filters.map((filter, i) => (
            <option value={filter} key={i}>
              {filter.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
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
    </div>
  );
}

export default Home;
