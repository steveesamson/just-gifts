/* eslint-disable react/prop-types */
import { useLoaderData, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cardContenxt";
import { useCallback } from "react";
import "./detail.css";

const Detail = () => {
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const { data: product } = useLoaderData();

  const onAdd = useCallback(() => {
    addItem({ ...product, quantity: 1, total: product.unitPrice });
    navigate("/cart");
  }, [product, addItem, navigate]);

  return (
    <section className="content">
      <div className="detail-grid">
        <article>
          <img
            loading="lazy"
            src={product.productImage}
            alt={product.productName}
          />
          <h1>${product.unitPrice?.toFixed(2)}</h1>
        </article>
        <article>
          <h2>{product.productName}</h2>
          <p>{product.description}</p>
        </article>
      </div>

      <article className="card submit">
        <button type="button" className="primary" onClick={onAdd}>
          Add to cart
        </button>
        <button
          type="button"
          disabled={!items.length}
          className="secondary"
          onClick={() => navigate("/checkout")}
        >
          Proceed to checkout
        </button>
        <button type="button" onClick={() => navigate(-1)}>
          Continue shopping
        </button>
      </article>
    </section>
  );
};

export default Detail;
