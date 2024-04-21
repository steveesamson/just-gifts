import { useState, useCallback, useMemo } from "react";
import { useCart } from "../../context/cardContenxt";
import { useNavigate } from "react-router-dom";
import CartRow from "./cart-row";
import { Prompt } from "../../views/dialog";
import "./cart.css";

const Cart = () => {
  useNavigate();
  const { items, removeItem, clear } = useCart();
  const [clearItems, setClearItems] = useState(false);
  const [remove, setRemove] = useState(null);
  const navigate = useNavigate();

  const total = useMemo(() => {
    if (!items.length) return 0;
    return items.reduce((sum, item) => sum + item.total, 0);
  }, [items]);

  const onRemove = useCallback(() => {
    removeItem(remove);
    setRemove(null);
  }, [remove, removeItem]);

  return (
    <>
      <section className="content">
        <fieldset>
          <legend>Your Cart</legend>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th className="currency">Unit Price</th>
                <th className="currency flex">Quantity</th>
                <th className="currency">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartRow
                  key={item._id}
                  item={item}
                  onRemove={() => setRemove(item)}
                />
              ))}
              <tr>
                <td colSpan={3}>TOTAL</td>

                <td className="currency">${total.toFixed(2)}</td>
                <td className="currency"></td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <section className="card submit">
          <button
            type="submit"
            className="primary"
            disabled={!items.length}
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => navigate("/")}
          >
            Continue shopping
          </button>
          <button
            type="button"
            className="button"
            disabled={!items.length}
            onClick={() => setClearItems(true)}
          >
            Clear
          </button>
        </section>
      </section>
      <Prompt
        title="Confirm Clear"
        text="Are you sure you want to clear your cart?"
        open={clearItems}
        onYes={() => {
          clear();
          setClearItems(false);
        }}
        onNo={() => setClearItems(false)}
      />
      <Prompt
        title="Confirm Remove"
        text="Are you sure you want to remove this item?"
        open={!!remove}
        onYes={onRemove}
        onNo={() => setRemove(null)}
      />
    </>
  );
};

export default Cart;
