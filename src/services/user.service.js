import { API } from "./auth.service";
import { toast } from "react-toastify";

export const blockUser = async (userId) => {
    try {
        const res = await API.post(`/users/block/${userId}`);
        if (res.status === 200) {
            toast.success(res.data.message);
        }
        return res.data;
    } catch (error) {
        console.error("Error blocking user:", error);
        toast.error(error.response?.data?.message || "Failed to block user");
        throw error;
    }
};

export const unblockUser = async (userId) => {
    try {
        const res = await API.post(`/users/unblock/${userId}`);
        if (res.status === 200) {
            toast.success(res.data.message);
        }
        return res.data;
    } catch (error) {
        console.error("Error unblocking user:", error);
        toast.error(error.response?.data?.message || "Failed to unblock user");
        throw error;
    }
};

export const getBlockedUsers = async () => {
    try {
        const res = await API.get("/users/blocked-users");
        return res.data.data;
    } catch (error) {
        console.error("Error fetching blocked users:", error);
        // toast.error("Failed to fetch blocked users");
        return [];
    }
};
