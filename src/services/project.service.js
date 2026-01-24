import { API } from "./auth.service"

const createProject = async(data) => {
  return await API.post('/project', data)
}


const getProjectsService =async () => {
  return await API.get('/project/my')
}



const updateProjectService =async (id, data) => {
    const res = await API.put(`/project/my/${id}`, data)
  return res?.data
}



export default {
  createProject,
  getProjectsService,
  updateProjectService
}
