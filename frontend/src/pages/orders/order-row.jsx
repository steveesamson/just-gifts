/* eslint-disable react/prop-types */
import { toShort } from "../../utils";

const OrderRow = ({ order, onDetail }) => {
  return (
    <tr>
      <td>{order?.shippingInfo?.fullName}</td>
      <td>{order?.shippingInfo?.emailAddress}</td>
      <td className="currency">{order?.orderTotal?.toFixed(2)}</td>
      <td className="currency">{toShort(order?.orderDate)}</td>
      <td className="currency">
        <section className="buttons">
          <button
            className="button"
            type="button"
            onClick={() => onDetail(order)}
          >
            details
          </button>
        </section>
      </td>
    </tr>
  );
};

export default OrderRow;
