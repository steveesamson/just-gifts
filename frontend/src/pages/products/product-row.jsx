/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const ProductRow = ({ product, onRemove }) => {
  return (
    <tr>
      <td>{product.productName}</td>
      <td className="currency">{product.quantityInStock}</td>
      <td className="currency">${product.unitPrice?.toFixed(2)}</td>
      <td className="currency">
        <section className="buttons">
          <NavLink to={`/editproduct/${product._id}`} className="button">
            edit
          </NavLink>
          <button className="button delete" onClick={onRemove}>
            delete
          </button>
        </section>
      </td>
    </tr>
  );
};

export default ProductRow;
