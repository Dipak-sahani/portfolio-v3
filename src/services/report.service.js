import { API } from "./auth.service";
import { toast } from "react-toastify";

export const createReport = async (reportData) => {
    try {
        const res = await API.post("/report", reportData);
        if (res.status === 201) {
            toast.success(res.data.message);
        }
        return res.data;
    } catch (error) {
        console.error("Error creating report:", error);
        toast.error(error.response?.data?.message || "Failed to submit report");
        throw error;
    }
};
