import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisV, faLocationArrow, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import EditProfileForm from '../components/profile/EditProfile';
import CommonProfilePage from '../components/profile/CommonProfilePage';
import { useAuthStore } from '../store/auth.store';
import { useEffect } from 'react';
import { useProjectStore } from '../store/project.store';


const ProfilePage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const user=useAuthStore((state)=>state.user)
  const [projectList, setProjects]=useState();
  const {getProjects, projects}=useProjectStore()
  

  const fetchProjects=async()=>{
    try {
      const res= await getProjects();
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchProjects();
  },[])

  useEffect(()=>{
    setProjects(projects)
  },[projects])

  return (
    <CommonProfilePage isUser={true} info={user}  projectList={projectList}/>
  );
};

export default ProfilePage;