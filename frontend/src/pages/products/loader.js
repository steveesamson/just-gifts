import { get, post, put, del } from "../../hooks/_fetch";

// Get a single product new/ existing
export const product = async ({ params }) => {
    if (params.productId) {
        return await get(`/products/${params.productId}`);
    }
    return { data: { imageName: "", productName: "", productImage: "", quantityInStock: 0, unitPrice: "", description: "" } };
};

// List products
export const products = async () => {
    return await get(`/products`);
};

export const deleteProduct = async (productId) => {
    return await del(`/products/${productId}`);
}
// Add / Update
export const save = async (params) => {
    const { _id, ...rest } = params;
    if (_id) {
        return await put(`/products/${_id}`, rest);
    } else {
        return await post(`/products`, rest);
    }
}