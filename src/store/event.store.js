import { create } from "zustand";
import { getEventService } from "../services/event.service";


export const useEventStore= create((set,get)=>({
    loading:false,
    events:[],
    

    getEvents:async()=>{
        try {

            set({loading:true})

            const res= await getEventService()
            // console.log(res);
            

            if(res){
                set((state)=>({ events:res.events, loading:false }))
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }


}))