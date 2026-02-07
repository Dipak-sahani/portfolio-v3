import { API } from "./auth.service";


export const likeService=async(data)=>{
    const res= await API.post("/like/", data)
    return res
}