import { API } from "./auth.service"; 

export const getMyNotifications= async()=>{
     try {
        const res= await API.get('/notification');
        // console.log(res);
        
        if (res.status==200) {
            return res?.data?.data?.notifications
        } 
     } catch (error) {
        console.log(error);
        alert(error.response.data.message || "Message service not working")
     }
}



/**
 * Mark single notification as read
 */
export const markNotificationReadAPI = async (id) => {
  const res = await API.patch(`/notification/${id}/read`);
  return res.data;
};

/**
 * Mark all notifications as read
 */
export const markAllReadAPI = async () => {
  const res = await API.patch(`/notification/read-all`);
  return res.data;
};