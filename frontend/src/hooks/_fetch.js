/* eslint-disable react-hooks/rules-of-hooks */
import { getInstance } from "./useSession";
import { API_HOST } from "../config/constants";
// Decorate with token
const withHeaders = () => {
    const instance = getInstance();

    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${instance}`
        }
    };
}
// HTTP methods to interract with API
const get = async (_url, params) => {
    const url = `${API_HOST}${_url}`;
    const _URL = [url, new URLSearchParams(params).toString()].join("?");
    const init = {
        method: "GET",
        mode: 'cors',
        ...withHeaders()
    };
    try {
        const response = await fetch(_URL, init);
        const status = response.status;
        return { ...await response.json(), status };
    } catch (e) {
        const error = e.toString();
        console.log(`Error: ${error}`);
        return { error: `There was an HTTP error.`, status: 400 };
    }
}
const post = async (_url, params) => {
    const url = `${API_HOST}${_url}`;
    const init = {
        method: "POST",
        mode: 'cors',
        ...withHeaders(),
        body: JSON.stringify(params)
    };
    try {
        const response = await fetch(url, init);
        const status = response.status;
        return { ...await response.json(), status };
    } catch (e) {
        const error = e.toString();
        console.log(`Error: ${error}`);
        return { error: `There was an HTTP error.`, status: 400 };
    }
}
const put = async (_url, params) => {
    const url = `${API_HOST}${_url}`;
    const init = {
        method: "PUT",
        mode: 'cors',
        ...withHeaders(),
        body: JSON.stringify(params)
    };
    try {
        const response = await fetch(url, init);
        const status = response.status;
        return { ...await response.json(), status };
    } catch (e) {
        const error = e.toString();
        console.log(`Error: ${error}`);
        return { error: `There was an HTTP error.`, status: 400 };
    }
}

const del = async (_url, params) => {
    const url = `${API_HOST}${_url}`;
    const _URL = [url, new URLSearchParams(params).toString()].join("?");
    const init = {
        method: "DELETE",
        mode: 'cors',
        ...withHeaders(),
    };
    try {
        const response = await fetch(_URL, init);
        const status = response.status;
        return { ...await response.json(), status };
    } catch (e) {
        const error = e.toString();
        console.log(`Error: ${error}`);
        return { error: `There was an HTTP error.`, status: 400 };
    }
}

export { get, post, put, del };