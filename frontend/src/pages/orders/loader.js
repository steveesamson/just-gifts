import { get } from "../../hooks/_fetch";

// Get a single order
export const order = async ({ params }) => {
    if (params.orderId) {
        return await get(`/orders/${params.orderId}`);
    }
};

// List orders
export const orders = async () => {
    return await get(`/orders`);
};
