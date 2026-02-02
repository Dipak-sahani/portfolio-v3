import React, { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { useNotificationStore } from "../store/notification.store";
import Posts from "./Posts";
import Footer from "../components/footer/Footer";
import { getAuthToken, mySession } from "../services/auth.service";
import Slogan from "../components/component/Slogan";
// import { toast } from "react-toastify";
// import { getDashboardData } from "../services/userDashboard.service";






const HomePage = () => {
     const {user, isAuthenticated, loadUser }= useAuthStore();
// console.log(isAuthenticated);
    const {fetchNotification} = useNotificationStore();
  const token=getAuthToken();


 useEffect(() => {
  if (token) {
    loadUser();
  }
}, [token]);

const fetchSession=async ()=>{
  const res=await mySession()
  console.log(res);
  
}

// useEffect(() => {
//   fetchSession()
// }, []);

useEffect(() => {
  if (isAuthenticated) {
    fetchNotification();

  }
}, [isAuthenticated]);



  return (
     <div className="mt-30">
    <div className="flex-col justify-self-center sm:w-[80%] w-[95%]">
      <section className="flex-col  text-center mt-20 mb-15  ">
        <h1 className="text-3xl sm:text-5xl font-bold font-sans"> { user&& <span>"{user?.fullName}"</span> }  Welcome to</h1>
        <h1 className="text-4xl sm:text-6xl font-bold font-sans"> <span className="text-red-500">Be</span>rojgar Founder</h1>
        <h1 className="text-2xl sm:text-3xl font-bold font-myIrish mt-10 ">
           {['" Find ', "Your ", "Team. ", "Build ", "Your ", "Startup ", "and ", 'Business "'].map(
  (word, i) => (
    <span
      key={i}
      className="inline-block transition-transform duration-300 ease-out hover:scale-125 hover:text-[#FD7B41] px-2 cursor-pointer"
    >
      {word}
    </span>
  )
)}


           
           </h1>
        {/* <h1 className="text-3xl font-bold font-myIrish"> or Business”</h1> */}
      </section>
      <section className="flex mt-20  ">
        <section className="flex-1/2 hidden sm:block">
        <img src="https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/HomePage.jpg" loading="lazy" className="shadow-2xl shadow-[#FD7B41] hover:scale-110 transition"/>

        </section>{user? <Slogan/>
       :<section className="flex-1/2 flex flex-col items-center px-2 sm:px-10 sm:pl-20 text-center">
  <h1 className="text-2xl font-semibold mb-5">
    Introduction
  </h1>

  <p className="w-[80%] sm:text-justify text-xl">
    BEROJGAR FOUNDER is designed to support startup enthusiasts by helping them find co-founders, partners, and team members. This platform makes it easy to turn ideas into real businesses.
  </p>
</section>}


      </section>
<div className="mt-20 flex-col sm:justify-self-center sm:w-[80%]">
        <hr  className="h-1 bg-[#FD7B41] mb-10"/>
        <h1 className="my-10 font-semibold text-2xl  text-center">Posts</h1>
        <Posts/>
      </div>
      
    </div>
      
    </div>
  );
};

export default HomePage;
