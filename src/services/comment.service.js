import { API } from "./auth.service";




export const postComment=async(data)=>{
    try {
        const res= await API.post('/comment',data)

        return res;
        
    } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message || "something error from comment ")
    }
}


export const getComments=async(postId)=>{
    try {
        
        const res=  await API.get(`/comment/${postId}`)
        return res;
    } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message || "Something error in get all comment ")
    }
}