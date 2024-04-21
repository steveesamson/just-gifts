import { useState, useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Display from "../../views/display-when";
import useScroller from "../../hooks/useScroller";
import { save } from "./loader";

import "./login.css";
import { useToast } from "../../context/notificationContenxt";

const UserForm = () => {
  const navigate = useNavigate();
  const scrollup = useScroller();
  const { data, error } = useLoaderData();
  const [formError, setError] = useState(error);
  const [errors, setErrors] = useState({});
  const [params, setParams] = useState(data);
  const { notify } = useToast();

  const onParams = useCallback(
    (e, name) => {
      const { value } = e.target;
      setParams((oldVal) => ({ ...oldVal, [name]: value }));
    },
    [setParams]
  );

  const onSubmit = useCallback(
    async (e) => {
      // Stop postback
      e.preventDefault();

      const { fullName, emailAddress, password, confirmPassword, _id } = params;

      const pendingErrors = {};
      if (fullName.isEmpty()) {
        pendingErrors.fullName = "Full Name is required";
      }
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
      const errorLen = Object.keys(pendingErrors);
      if (errorLen.length > 0) {
        scrollup();
        return setErrors(pendingErrors);
      } else {
        const load = { _id, fullName, emailAddress, password };
        const { error } = await save(load);
        if (error) {
          setError(error);
          return;
        }
        const message = `User ${_id ? "updated" : "added"} successfully.`;
        notify(message);
        navigate(-1);
      }
    },
    [params, setError, setErrors, navigate, scrollup, notify]
  );

  return (
    <form className="content">
      <fieldset>
        <Display when={!!params?._id}>
          <legend>Edit User</legend>
        </Display>
        <Display when={!params?._id}>
          <legend>New User</legend>
        </Display>
        <Display when={!!formError}>
          <small className="error">{formError}</small>
        </Display>
        <div className="form-field">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="input"
            placeholder="Enter Full Name"
            defaultValue={params?.fullName}
            onChange={(e) => onParams(e, "fullName")}
          />
          <Display when={!!errors.fullName}>
            <small className="error">{errors.fullName}</small>
          </Display>
        </div>
        <div className="form-field">
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="text"
            id="emailAddress"
            name="emailAddress"
            className="input"
            placeholder="Enter Email Address"
            defaultValue={params?.emailAddress}
            onChange={(e) => onParams(e, "emailAddress")}
          />
          <Display when={!!errors.emailAddress}>
            <small className="error">{errors.emailAddress}</small>
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
            defaultValue={params?.password}
            onChange={(e) => onParams(e, "password")}
          />
          <Display when={!!errors.password}>
            <small className="error">{errors.password}</small>
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
            defaultValue={params?.confirmPassword}
            onChange={(e) => onParams(e, "confirmPassword")}
          />
          <Display when={!!errors.confirmPassword}>
            <small className="error">{errors.confirmPassword}</small>
          </Display>
        </div>
      </fieldset>
      <section className="card submit">
        <button type="submit" className="primary" onClick={onSubmit}>
          Save
        </button>
        <button
          type="button"
          className="button secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </section>
    </form>
  );
};

export default UserForm;
