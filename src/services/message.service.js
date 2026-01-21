import { API } from "./auth.service";


export const getContact=async()=>{
    try {

        const res= await API.get('/message/my-contact')
        // console.log(res);
        
        return res.data.data;
        
    } catch (error) {
        console.log(error);
        
    }
}


export const getMessagesByConversation = async (
  conversationId,
  limit = 20,
  skip = 0
) => {
  try {
    const res = await API.get(`/message/${conversationId}`, {
      params: { limit, skip },
    });

    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};


