import { useCallback, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { Prompt } from "../../views/dialog";
import UserRow from "./user-row";
import { deleteUser } from "./loader";
import { useToast } from "../../context/notificationContenxt";

const Users = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData();
  const [users, setUsers] = useState(data);
  const { notify } = useToast();
  // Track deletion
  const [toDelete, setToDelete] = useState(null);

  const onDelete = useCallback(async () => {
    const { _id } = toDelete;
    const { error } = await deleteUser(_id);
    if (!error) {
      setUsers((prev) => prev.filter((u) => u._id !== _id));
      setToDelete(null);
      notify("User deleted successully.");
    }
  }, [toDelete, notify]);

  const onAdd = useCallback(() => {
    navigate("/adduser");
  }, [navigate]);

  return (
    <fieldset>
      <legend>Users</legend>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="currency">
              <button type="button" className="primary" onClick={onAdd}>
                Add User
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                onRemove={() => setToDelete(user)}
              />
            ))}
        </tbody>
      </table>
      <Prompt
        title="Confirm Delete"
        text="Are you sure you want to delete this user?"
        open={!!toDelete}
        onYes={onDelete}
        onNo={() => setToDelete(null)}
      />
    </fieldset>
  );
};

export default Users;
