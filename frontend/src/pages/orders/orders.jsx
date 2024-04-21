import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import useSession from "../../hooks/useSession";
import Display from "../../views/display-when";
import OrderRow from "./order-row";
import OrderDetail from "./order-detail";

const Orders = () => {
  const navigate = useNavigate();
  const { inSession } = useSession();
  const { data: orders } = useLoaderData();
  const [detail, setDetail] = useState(null);

  if (!inSession) {
    return navigate("/");
  }

  return (
    <fieldset>
      <legend>Orders</legend>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th className="currency">Total($)</th>
            <th className="currency">Date</th>
            <th className="currency"></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <OrderRow key={order._id} order={order} onDetail={setDetail} />
            ))}
          <Display when={!orders.length}>
            <tr>
              <td colSpan={5}>There are no orders.</td>
            </tr>
          </Display>
        </tbody>
      </table>
      <OrderDetail detail={detail} onClose={() => setDetail(null)} />
    </fieldset>
  );
};

export default Orders;
