import React, { useEffect, useState } from 'react';
import StartupProfile from './StartupProfile';
import { useAuthStore } from '../../store/auth.store';
import { useStartupStore } from '../../store/startup.store';

const MyStartupProfile = () => {
    const user=useAuthStore((state)=>state.user)
    const myStartup = useStartupStore((state) => state.myStartup);
    const fetchMyStartup=useStartupStore((state)=>state.fetchMyStartup)
    // const [myStartup, setMyStartup]=useState([])


    const fetchMyStartupFunc=async()=>{
        try {
            const res= await fetchMyStartup()
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        fetchMyStartupFunc()
    },[])

    
    return (
        <div>
            <StartupProfile startupData={myStartup} isUser={user}/>
        </div>
    );
}

export default MyStartupProfile;
