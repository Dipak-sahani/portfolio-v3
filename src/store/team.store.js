import { create } from "zustand";
import { fetchMyTeams } from "../services/team.service";



export const useTeamStore=create((set,get)=>({
    myTeam:[],


    getMyteam:async()=>{
        try {
            const {myTeam}=get()

            if (myTeam) {
               return 
            }

            const res= fetchMyTeams();
            console.log(res);
            
            
        } catch (error) {
            console.log(error);
            
        }
    }
}))