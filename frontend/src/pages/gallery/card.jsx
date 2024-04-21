/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const navigate = useNavigate();

  const onDetails = useCallback(() => {
    navigate(`/product-detail/${product._id}`);
  }, [navigate, product]);

  return (
    <article className="card" onClick={onDetails}>
      <img
        loading="lazy"
        src={product.productImage}
        alt={product.productName}
      />
      <section className="name-section">
        <p className="price">${product.unitPrice?.toFixed(2)}</p>
        <p className="title">{product.productName}</p>
      </section>
    </article>
  );
};

export default Card;
