import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { NotFound } from "./404/NotFound";
import { ItemList } from "./ItemList";
import { Spinner } from "./spinner/Spinner";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const { categoryId } = useParams();
  const URL = `https://dummyjson.com/products/category/${
    categoryId === undefined ? "tops" : categoryId
  }`;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setProducts(data.products);
      } catch {
        setError(true);
        <Link to={"/*"} />;
      }
    };
    getProducts();
  }, [categoryId]);

  return (
    <>
      {!error ? (
        <>
          {products.length > 0 ? (
            <>
              <ItemList products={products} />
            </>
          ) : (
            <span className="flex relative top-2/3 left-1/2 ">
              <Spinner />
            </span>
          )}
        </>
      ) : (
        <NotFound message={products.message} />
      )}
    </>
  );
};
