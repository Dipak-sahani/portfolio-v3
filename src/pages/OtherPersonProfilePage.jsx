import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../services/getUser.service";
import CommonProfilePage from "../components/profile/CommonProfilePage";
import { useState } from "react";
import { useAuthStore } from "../store/auth.store";

const OtherPersonProfilePage = () => {
  const { id } = useParams();
  // console.log(id);

  const user=useAuthStore((state)=>state.user)

  const [info, setInfo] = useState(null);
  const [projets, setProjects] = useState([]);
  const [followInfo, setFollowInfo]=useState([]);

  const fetchUserDetail = async () => {
    try {
      const res = await getUserProfile(id);
      console.log(res);

      setInfo(res?.user);
      setProjects(res?.projects);
      setFollowInfo(res?.followStats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  return (
    <div>
      <CommonProfilePage isUser={user._id==id?true:false} info={info} follow={followInfo}  projectList={projets} />
    </div>
  );
};

export default OtherPersonProfilePage;
