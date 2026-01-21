import { API } from "./auth.service";

export const getDashboardData=async()=>{
    try {
        const res= await API.get('/users/user-dashboard')

        // console.log(res);
        
        return res?.data?.data;
        
    } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message || "something error from comment ")
    }
}
