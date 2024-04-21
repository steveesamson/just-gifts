import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as dologin } from "./loader";
import Display from "../../views/display-when";
import useSession from "../../hooks/useSession";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useSession();
  const [params, setParams] = useState({ emailAddress: "", password: "" });
  const [formError, setError] = useState("");

  const onParams = useCallback(
    (e, name) => {
      const { value } = e.target;
      setParams((oldVal) => ({ ...oldVal, [name]: value }));
    },
    [setParams]
  );

  const onLogin = useCallback(
    async (e) => {
      // Stop postback
      e.preventDefault();

      const { emailAddress, password } = params;
      if (emailAddress.length && password.length) {
        const { error, data } = await dologin(params);
        if (error) {
          setError(error);
          console.log({ error });
          return;
        }
        if (location.state) {
          login(data, location.state);
        } else {
          login(data);
        }

        return;
      }
      setError("Enter Email Address and password to login.");
    },
    [params, setError, login, location]
  );

  return (
    <form className="content">
      <fieldset>
        <legend>Login to Just Gifts</legend>
        <Display when={!!formError}>
          <small className="error">{formError}</small>
        </Display>

        <div className="form-field">
          <label htmlFor="username">Email Address:</label>
          <input
            type="text"
            id="emailAddress"
            name="emailAddress"
            className="input"
            placeholder="Enter Email Address"
            defaultValue={params.emailAddress}
            onChange={(e) => onParams(e, "emailAddress")}
          />
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
        </div>
      </fieldset>
      <section className="card submit">
        <button type="submit" className="primary" onClick={onLogin}>
          Login
        </button>
        <button type="button" className="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </section>
    </form>
  );
};

export default Login;
