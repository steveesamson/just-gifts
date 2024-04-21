/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { useCart } from "../../context/cardContenxt";

const CartRow = ({ item, onRemove }) => {
  const { updateItem } = useCart();

  const decreaseQty = useCallback(() => {
    const quantity = item.quantity - 1;
    if (quantity < 1) return;
    updateItem({ ...item, quantity });
  }, [item, updateItem]);

  const increaseQty = useCallback(() => {
    const quantity = item.quantity + 1;
    updateItem({ ...item, quantity });
  }, [item, updateItem]);

  return (
    <tr>
      <td>{item.productName}</td>
      <td className="currency">${item.unitPrice?.toFixed(2)}</td>
      <td className="currency flex">
        <button type="button" onClick={decreaseQty}>
          -
        </button>
        {item.quantity}
        <button type="button" onClick={increaseQty}>
          +
        </button>
      </td>
      <td className="currency">${item.total?.toFixed(2)}</td>
      <td className="currency">
        <section className="buttons">
          <button type="button" className="button delete" onClick={onRemove}>
            Remove
          </button>
        </section>
      </td>
    </tr>
  );
};

export default CartRow;
