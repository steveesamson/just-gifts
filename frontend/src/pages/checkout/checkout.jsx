import { useState, useCallback, useMemo } from "react";
import { useCart } from "../../context/cardContenxt";
import { useNavigate, useLoaderData } from "react-router-dom";
import Display from "../../views/display-when";
import { MONTHS, PROVINCES, YEARS } from "../../utils";
import useSession from "../../hooks/useSession";
import useScroller from "../../hooks/useScroller";
import { saveCheckout } from "./loader";

import "./checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const scrollup = useScroller();
  const { inSession } = useSession();
  const { data = {} } = useLoaderData();
  const { items, clear } = useCart();
  const [formError, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [params, setParams] = useState(data);

  const onParams = useCallback(
    (e, name) => {
      const { value } = e.target;
      setParams((oldVal) => ({ ...oldVal, [name]: value }));
    },
    [setParams]
  );

  const total = useMemo(() => {
    if (!items.length) return 0;
    return items.reduce((sum, item) => sum + item.total, 0);
  }, [items]);

  // Submit routine for checkout
  const onSubmit = useCallback(
    async (e) => {
      // Stop postback
      e.preventDefault();

      const {
        fullName,
        phone,
        address,
        city,
        province,
        postalCode,
        creditCardNo,
        cardExpiryMonth,
        cardExpiryYear,
        emailAddress,
        password,
        confirmPassword,
      } = params;

      const pendingErrors = {};
      if (!cardExpiryMonth || cardExpiryMonth.isEmpty()) {
        pendingErrors.cardExpiryMonth = "Card Expiry Month is required";
      }
      if (!cardExpiryYear || cardExpiryYear.isEmpty()) {
        pendingErrors.cardExpiryYear = "Card Expiry Year is required";
      }
      if (phone.isEmpty()) {
        pendingErrors.phone = "Phone is required";
      } else if (!phone.isPhone()) {
        pendingErrors.phone = "Phone number not in required format.";
      }
      if (address.isEmpty()) {
        pendingErrors.address = "Address is required";
      }
      if (!creditCardNo || creditCardNo.isEmpty()) {
        pendingErrors.creditCardNo = "Credit Card No. is required";
      } else if (!creditCardNo.isCreditCard()) {
        pendingErrors.creditCardNo = "Credit Card No. not in required format.";
      }

      if (city.isEmpty()) {
        pendingErrors.city = "City is required";
      }
      if (province.isEmpty()) {
        pendingErrors.province = "Province is required";
      }
      if (fullName.isEmpty()) {
        pendingErrors.fullName = "Customer Name is required";
      }

      if (postalCode.isEmpty()) {
        pendingErrors.postalCode = "Postal Code is required";
      } else if (!postalCode.isPostalCode()) {
        pendingErrors.postalCode = "Postal Code not in required format.";
      }
      if (!inSession) {
        if (emailAddress.isEmpty()) {
          pendingErrors.emailAddress = "Email Address is required";
        } else if (!emailAddress.isEmail()) {
          pendingErrors.emailAddress = "Email Address is not valid";
        }
        if (password.isEmpty()) {
          pendingErrors.password = "Password is required";
        }
        if (confirmPassword.isEmpty()) {
          pendingErrors.confirmPassword = "Confirm password is required";
        }

        if (!password.isEmpty() && password !== confirmPassword) {
          pendingErrors.confirmPassword =
            "Confirm password does not match password";
        }
      }

      const errorLen = Object.keys(pendingErrors);
      if (errorLen.length > 0) {
        setError("There are errors on this form. Fix them please.");
        scrollup();
        return setErrors(pendingErrors);
      } else {
        params.items = [...items];
        params.total = total;
        // post checkout
        const { error, data } = await saveCheckout(params);

        if (error) {
          setError(error);
          return;
        }
        // clear cart
        clear();
        // redirect to thank you page
        navigate(`/thankyou/${data._id}`);
      }
    },
    [params, inSession, total, items, navigate, clear, setErrors, scrollup]
  );

  if (!items.length) return null;

  return (
    <Display when={items.length > 0}>
      <fieldset className="content checkout-page">
        <legend className={formError ? "error" : ""}>Checkout</legend>
        <Display when={!!formError}>
          <strong className="error">{formError}</strong>
        </Display>

        <article className="contentWrapper">
          <div className="formWrapper">
            <Display when={!inSession}>
              <fieldset>
                <legend>Returning Customers?</legend>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => navigate("/login", { state: "/checkout" })}
                >
                  Login here
                </button>
              </fieldset>
            </Display>

            <fieldset>
              <legend>Shipping Info</legend>

              <div className="form-field">
                <label htmlFor="fullName">Customer Name:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="input"
                  placeholder="Enter Full Name"
                  defaultValue={params.fullName}
                  onChange={(e) => onParams(e, "fullName")}
                />
                <Display when={!!errors.fullName}>
                  <strong className="error">{errors.fullName}</strong>
                </Display>
              </div>
              <div className="form-field">
                <label htmlFor="phone">
                  Phone<em>(999-999-9999)</em>:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="input"
                  placeholder="XXX-XXX-XXXX"
                  defaultValue={params.phone}
                  onChange={(e) => onParams(e, "phone")}
                />
                <Display when={!!errors.phone}>
                  <strong className="error">{errors.phone}</strong>
                </Display>
              </div>
              <div className="form-field">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  className="input"
                  placeholder="Enter Address"
                  defaultValue={params.address}
                  onChange={(e) => onParams(e, "address")}
                ></textarea>
                <Display when={!!errors.address}>
                  <strong className="error">{errors.address}</strong>
                </Display>
              </div>
              <div className="form-field">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="input"
                  placeholder="Enter City"
                  defaultValue={params.city}
                  onChange={(e) => onParams(e, "city")}
                />
                <Display when={!!errors.city}>
                  <strong className="error">{errors.city}</strong>
                </Display>
              </div>
              <div className="form-field">
                <label htmlFor="province">Province:</label>
                <select
                  id="province"
                  name="province"
                  className="input"
                  defaultValue={params.province}
                  onChange={(e) => onParams(e, "province")}
                >
                  <option value="" selected disabled>
                    Select province
                  </option>
                  {PROVINCES.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                <Display when={!!errors.province}>
                  <strong className="error">{errors.province}</strong>
                </Display>
              </div>

              <div className="form-field">
                <label htmlFor="postalCode">
                  Postal Code<em>(A9A 9A9)</em>:
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  className="input"
                  placeholder="A9A 9A9"
                  defaultValue={params.postalCode}
                  onChange={(e) => onParams(e, "postalCode")}
                />
                <Display when={!!errors.postalCode}>
                  <strong className="error">{errors.postalCode}</strong>
                </Display>
              </div>
            </fieldset>
          </div>
          <div className="listWrapper">
            <fieldset className="order-summary">
              <legend>Order Summary</legend>
              <ul>
                {items.map((item) => {
                  return (
                    <li key={item._id}>
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
                  <strong>${total.toFixed(2)}</strong>
                </li>
              </ul>
            </fieldset>
            <fieldset>
              <legend>Credit Card Info</legend>
              <div className="form-field">
                <label htmlFor="creditCardNo">
                  Card No.<em>(9999-9999-9999-9999)</em>:
                </label>
                <input
                  type="text"
                  id="creditCardNo"
                  name="creditCardNo"
                  className="input"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  defaultValue={params.creditCardNo}
                  onChange={(e) => onParams(e, "creditCardNo")}
                />
                <Display when={!!errors.creditCardNo}>
                  <strong className="error">{errors.creditCardNo}</strong>
                </Display>
              </div>
              <section className="columns">
                <div className="form-field">
                  <label htmlFor="cardExpiryMonth">Expiry Month:</label>
                  <select
                    type="text"
                    id="cardExpiryMonth"
                    name="cardExpiryMonth"
                    className="input"
                    defaultValue={params.cardExpiryMonth}
                    onChange={(e) => onParams(e, "cardExpiryMonth")}
                  >
                    <option value="" selected disabled>
                      Select month
                    </option>
                    {MONTHS.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <Display when={!!errors.cardExpiryMonth}>
                    <strong className="error">{errors.cardExpiryMonth}</strong>
                  </Display>
                </div>
                <div className="form-field">
                  <label htmlFor="cardExpiryYear">Expiry Year:</label>
                  <select
                    type="text"
                    id="cardExpiryYear"
                    name="cardExpiryYear"
                    className="input"
                    defaultValue={params.cardExpiryYear}
                    onChange={(e) => onParams(e, "cardExpiryYear")}
                  >
                    <option value="" selected disabled>
                      Select year
                    </option>
                    {YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <Display when={!!errors.cardExpiryYear}>
                    <strong className="error">{errors.cardExpiryYear}</strong>
                  </Display>
                </div>
              </section>
            </fieldset>
            <Display when={!inSession}>
              <fieldset>
                <legend>Account Info</legend>
                <div className="form-field">
                  <label htmlFor="emailAddress">Email Address:</label>
                  <input
                    type="text"
                    id="emailAddress"
                    name="emailAddress"
                    className="input"
                    placeholder="Enter Email Address"
                    defaultValue={params.emailAddress}
                    onChange={(e) => onParams(e, "emailAddress")}
                  />
                  <Display when={!!errors.emailAddress}>
                    <strong className="error">{errors.emailAddress}</strong>
                  </Display>
                </div>
                <div className="form-field">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="input"
                    placeholder="Enter Password"
                    defaultValue={params.password}
                    onChange={(e) => onParams(e, "password")}
                  />
                  <Display when={!!errors.password}>
                    <strong className="error">{errors.password}</strong>
                  </Display>
                </div>
                <div className="form-field">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="input"
                    placeholder="Enter Confirm Password"
                    defaultValue={params.confirmPassword}
                    onChange={(e) => onParams(e, "confirmPassword")}
                  />
                  <Display when={!!errors.confirmPassword}>
                    <strong className="error">{errors.confirmPassword}</strong>
                  </Display>
                </div>
              </fieldset>
            </Display>
          </div>
        </article>
        <section className="card submit">
          <button
            type="button"
            className="primary"
            disabled={!items.length}
            onClick={onSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </section>
      </fieldset>
    </Display>
  );
};

export default Checkout;
