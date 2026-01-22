import React, { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { useNotificationStore } from "../store/notification.store";
import Posts from "./Posts";
import Footer from "../components/footer/Footer";
// import { toast } from "react-toastify";
// import { getDashboardData } from "../services/userDashboard.service";

const HomePage = () => {
     const {user, isAuthenticated, loadUser }= useAuthStore();
// console.log(isAuthenticated);
    const {fetchNotification} = useNotificationStore();

      
 useEffect(() => {
    // toast.success("hi")
      // getDashboardData();
      if (isAuthenticated) {
      fetchNotification();
        
      }
      loadUser();
    }, []); // only once
  



  return (
     <div className="mt-30">
    <div className="flex-col justify-self-center w-[80%]">
      <section className="flex-col  text-center mt-20 mb-15  ">
        <h1 className="text-5xl font-bold font-sans"> { user&& <span>"{user?.fullName}"</span> }  Welcome to</h1>
        <h1 className="text-6xl font-bold font-sans"> <span className="text-red-500">Be</span>rojgar Founder</h1>
        <h1 className="text-3xl font-bold font-myIrish mt-10"> “Find Your Team. Build Your Startup and Business”</h1>
        {/* <h1 className="text-3xl font-bold font-myIrish"> or Business”</h1> */}
      </section>
      <section className="flex mt-20  ">
        <section className="flex-1/2 hidden sm:block">
        <img src="https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/HomePage.jpg" className="shadow-2xl shadow-[#FD7B41]"/>

        </section>
        <section className="flex-1/2 px-2 sm:px-10 sm:pl-20">
            <h1 className="text-2xl font-semibold mb-5">
                Introduction
            </h1>
            <p className="w-[80%] text-justify text-xl">
                BEROJGAR FOUNDER is designed to support startup enthusiasts by helping them find co-founders, partners, and team members. This platform makes it easy to turn ideas into real businesses.
            </p>
        </section>

      </section>

      <div className="mt-20">
        <hr  className="h-1 bg-[#FD7B41] mb-10"/>
        <h1 className="my-10 font-semibold text-2xl  text-center">Posts</h1>
        <Posts/>
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
