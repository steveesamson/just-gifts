import { useCallback, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import ProductRow from "./product-row";
import useSession from "../../hooks/useSession";
import { Prompt } from "../../views/dialog";
import { deleteProduct } from "./loader";
import { useToast } from "../../context/notificationContenxt";

const Products = () => {
  const navigate = useNavigate();
  const { user, inSession } = useSession();
  const { data } = useLoaderData();
  const [products, setProducts] = useState(data);
  const { notify } = useToast();

  // Track deletion
  const [toDelete, setToDelete] = useState(null);
  const onAdd = useCallback(() => {
    navigate("/addproduct");
  }, [navigate]);

  // Handle delete
  const onDelete = useCallback(async () => {
    const { _id } = toDelete;
    const { error } = await deleteProduct(_id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p._id !== _id));
      setToDelete(null);
      notify("Product deleted successully.");
    }
  }, [toDelete, notify]);

  // This is admin's turf
  // Out of bounds
  if (!inSession || user.role !== "admin") {
    return navigate("/");
  }
  return (
    <fieldset>
      <legend>Products</legend>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="currency">Stock Qty</th>
            <th className="currency">Unit Price</th>
            <th className="currency">
              <button type="button" className="primary" onClick={onAdd}>
                Add Product
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((p) => (
              <ProductRow
                key={p._id}
                product={p}
                onRemove={() => setToDelete(p)}
              />
            ))}
        </tbody>
      </table>
      <Prompt
        title="Confirm Delete"
        text="Are you sure you want to delete this product?"
        open={!!toDelete}
        onYes={onDelete}
        onNo={() => setToDelete(null)}
      />
    </fieldset>
  );
};

export default Products;
