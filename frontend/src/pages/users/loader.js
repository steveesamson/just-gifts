import { get, post, put, del } from "../../hooks/_fetch";

// Get a single user new/existing
export const user = async ({ params }) => {
    if (params.userId) {
        return await get(`/users/${params.userId}`);
    }
    return { data: { fullName: "", emailAddress: "", password: "", confirmPassword: "", role: "admin" } };
};

// List users
export const users = async () => {
    return await get(`/users`);
};

export const deleteUser = async (userId) => {
    return await del(`/users/${userId}`);
}

export const login = async (params) => {
    return await post("/users/login", params);
}
// Add / Update users
export const save = async (params) => {
    const { _id, ...rest } = params;
    if (_id) {
        return await put(`/users/${_id}`, rest);
    } else {
        return await post(`/users`, rest);
    }
}