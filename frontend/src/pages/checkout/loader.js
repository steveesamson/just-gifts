import { get, post, put } from "../../hooks/_fetch";

export const shipping = async () => {
    const { data } = await get(`/shippings/1`, true);
    if (data) {
        const { shippingInfo = {}, ...rest } = data;
        return { data: { ...rest, ...shippingInfo } };
    }
    return {
        data: {
            fullName: "",
            phone: "",
            address: "",
            city: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
            province: "",
            postalCode: "",
            creditCardNo: "",
            cardExpiryMonth: "",
            cardExpiryYear: "",
        }
    };
};


export const saveCheckout = async (params) => {
    return await post(`/orders`, params);
}