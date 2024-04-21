import { get } from "../../hooks/_fetch";

export const ordersDetail = async ({ params }) => {
    return await get(`/orders/detail/${params.orderId}`);
};

