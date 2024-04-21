/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Modal } from "../../views/dialog";
import { toShort } from "../../utils";
import "./order-detail.css";

const OrderDetail = ({ onClose, detail }) => {
  const { shippingInfo, orderItems, order } = useMemo(() => {
    if (!detail) return {};
    const { shippingInfo, orderItems, ...order } = detail;
    return { shippingInfo, orderItems, order };
  }, [detail]);

  return (
    <Modal open={!!detail}>
      <fieldset className="content">
        <legend>Order Detail</legend>
        <div className="form-field">
          <label>Order Date: {toShort(order?.orderDate)}</label>
        </div>
        <article className="contentWrapper">
          <div className="formWrapper">
            <fieldset>
              <legend>Shipping Info</legend>

              <div className="form-field">
                <label htmlFor="fullName">Customer Name:</label>
                <span className="input">{shippingInfo?.fullName}</span>
              </div>
              <div className="form-field">
                <label htmlFor="emailAddress">Email Address:</label>
                <span className="input">{shippingInfo?.emailAddress}</span>
              </div>
              <div className="form-field">
                <label htmlFor="phone">Phone:</label>
                <span className="input">{shippingInfo?.phone}</span>
              </div>
              <div className="form-field">
                <label htmlFor="address">Address:</label>
                <span className="input">{shippingInfo?.address}</span>
              </div>
              <div className="form-field">
                <label htmlFor="city">City:</label>
                <span className="input">{shippingInfo?.city}</span>
              </div>
              <div className="form-field">
                <label htmlFor="province">Province:</label>
                <span className="input">{shippingInfo?.province}</span>
              </div>
              <div className="form-field">
                <label htmlFor="postalCode">Postal Code:</label>
                <span className="input">{shippingInfo?.postalCode}</span>
              </div>
            </fieldset>
          </div>
          <div className="listWrapper">
            <fieldset className="order-summary">
              <legend>Order Summary</legend>
              <ul>
                {orderItems &&
                  orderItems.map((item, index) => {
                    return (
                      <li key={index}>
                        <em>
                          <img src={item.productImage} />
                        </em>
                        <h5>{item.productName}</h5>
                        <strong>${item.total.toFixed(2)}</strong>
                      </li>
                    );
                  })}
                <li className="sum-row">
                  <h5>TOTAL:</h5>
                  <strong>${order?.orderTotal?.toFixed(2)}</strong>
                </li>
              </ul>
            </fieldset>
            <fieldset>
              <legend>Credit Card Info</legend>
              <div className="form-field">
                <label htmlFor="creditCardNo">Card No.:</label>
                <span className="input">{order?.creditCardNo}</span>
              </div>
              <section className="columns">
                <div className="form-field">
                  <label htmlFor="cardExpiryMonth">Expiry Month:</label>
                  <span className="input">{order?.cardExpiryMonth}</span>
                </div>
                <div className="form-field">
                  <label htmlFor="cardExpiryYear">Expiry Year:</label>
                  <span className="input">{order?.cardExpiryYear}</span>
                </div>
              </section>
            </fieldset>
          </div>
        </article>
        <section className="card submit">
          <button type="button" className="button secondary" onClick={onClose}>
            Close
          </button>
        </section>
      </fieldset>
    </Modal>
  );
};

export default OrderDetail;
