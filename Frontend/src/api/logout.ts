import axiosInstance from "./";

const logout = async () => {
    const url = "/auth/logout";
    return axiosInstance.post<void>(url).then(res => res.data);
};

export default logout;