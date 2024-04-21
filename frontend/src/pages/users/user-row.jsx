/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const UserRow = ({ user, onRemove }) => {
  return (
    <tr>
      <td>{user.fullName}</td>
      <td>{user.emailAddress}</td>
      <td>{user.role}</td>
      <td>
        <section className="buttons">
          <NavLink to={`/edituser/${user._id}`} className="button">
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

export default UserRow;
