import { toast } from "react-toastify";
import { API } from "./auth.service";

export const getDashboardDataService=async()=>{
    try {
        const res= await API.get('/users/user-dashboard')

        // console.log(res);
        
        return res?.data?.data;
        
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "something error from comment ")
        
    }
}
