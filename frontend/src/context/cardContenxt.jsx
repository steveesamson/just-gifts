/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

const cartKey = "k3rtkey";

const defaultValue = {
  items: [],
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
  clear: () => {},
};

const CartContext = createContext(defaultValue);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const storedItems = sessionStorage.getItem(cartKey);
    if (storedItems) {
      return JSON.parse(storedItems);
    }
    return [];
  });

  useEffect(() => {
    sessionStorage.setItem(cartKey, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (item) => {
      setItems((prev) => {
        const exists = prev.find((next) => next._id === item._id);
        if (exists) {
          exists.quantity = exists.quantity + 1;
          exists.total = exists.unitPrice * exists.quantity;
          return prev;
        }
        return [...prev, item];
      });
    },
    [setItems]
  );

  const removeItem = useCallback(
    (item) => {
      setItems((prev) => prev.filter((i) => i._id != item._id));
    },
    [setItems]
  );

  const updateItem = useCallback(
    (item) => {
      if (item.quantity < 1) {
        return removeItem(item);
      }

      setItems((prev) =>
        prev.map((next) =>
          next._id === item._id
            ? { ...next, ...item, total: item.quantity * item.unitPrice }
            : next
        )
      );
    },
    [setItems, removeItem]
  );

  const clear = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateItem,
      clear,
    }),
    [items, addItem, removeItem, updateItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
