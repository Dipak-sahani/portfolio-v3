import { API } from "./auth.service";


export const getContact=async()=>{
    try {

        const res= await API.get('/message/my-contact')
        console.log(res);
        
        return res.data.data;
        
    } catch (error) {
        console.log(error);
        
    }
}


export const getMessagesByConversation=async(id)=>{
    try {
        const res= await API.get(`/message/${id}`)

        // console.log(res);

        return res?.data?.data?.messages;
        
    } catch (error) {
        console.log(error);
        
    }
}



