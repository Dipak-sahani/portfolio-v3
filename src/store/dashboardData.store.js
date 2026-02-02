import { create } from "zustand";
import { getDashboardDataService } from "../services/userDashboard.service";
import { useEventStore } from "./event.store";



export const useDashboardData=create((set, get)=>({
    dashboardData:[],
    dashboardLoading:false,


    getDashboardData:async()=>{
        try {
            console.log("hhh");
            
            const {setEventsFromDashboard}=useEventStore.getState()
            const {dashboardData,dashboardLoading}= get()

            if (dashboardData.length>0 || dashboardLoading) return;

            set({dashboardLoading:true})
            const res= await getDashboardDataService();

            // console.log(res);
            set({
                dashboardData:res,
                dashboardLoading:false
            })

            setEventsFromDashboard(res?.registeredEvent?.data)
            return res;
            
        } catch (error) {

            set({dashboardLoading:false})
            console.log(error);
            
        }
    }
}))