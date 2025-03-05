import axios from "axios";

export const useAxios = () => {
    const request = ({ url, method = "GET", headers, data, params }) => {
        return axios({
            url: `${import.meta.env.VITE_BASE_URL}/${url}`,
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            data: { ...data },
            params: {
                ...params,
            },
        })
        .then(({ data }) => data.data)
        .catch((error) => {
            console.log("Axios request error:", error.response?.data);
            throw error;
        });
    };

    return request;
};
