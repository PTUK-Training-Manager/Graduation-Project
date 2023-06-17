import axiosInstance from "./";

const logout = async () => {
    const url = "/auth/logout";
    return axiosInstance.post<void>(url, {
        headers: {
            "access-token": localStorage.getItem("access-token") ?? "",
        },
    }).then(res => res.data);
};

export default logout;