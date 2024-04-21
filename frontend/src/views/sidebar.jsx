import { NavLink } from "react-router-dom";
import Footer from "./footer.jsx";
import useSession from "../hooks/useSession.js";
import Display from "./display-when.jsx";
import { useCart } from "../context/cardContenxt.jsx";
import Logo from "./logo.jsx";

const SideBar = () => {
  const { items } = useCart();
  const { inSession, user } = useSession();
  return (
    <header>
      <h1 className="logo">
        <Logo />
        <div className="text">Just Gifts!</div>
      </h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Cart ({items.length || "empty"})
            </NavLink>
          </li>
          <Display when={inSession}>
            <Display when={user?.role === "admin"}>
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  Users
                </NavLink>
              </li>
            </Display>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                Orders
              </NavLink>
            </li>
            <Display when={user?.role === "admin"}>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  Products
                </NavLink>
              </li>
            </Display>
          </Display>
        </ul>
      </nav>
      <Footer />
    </header>
  );
};

export default SideBar;
