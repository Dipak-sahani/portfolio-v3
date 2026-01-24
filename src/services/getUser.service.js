import { toast } from "react-toastify";
import { API } from "./auth.service";


export const getUserProfile= async(userId)=>{
     try {
        const res= await API.get(`/users/get-by-id/${userId}`);
        // console.log(res);
        
        if (res.status==200) {
            return res?.data
        } 
     } catch (error) {
        console.log(error);
    toast.error(error.response.data.message || "user not found")
        
     }
}
