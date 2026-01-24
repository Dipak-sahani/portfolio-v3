import { create } from 'zustand'
import projectService from '../services/project.service'

export const useProjectStore = create((set) => ({
  loading: false,
  error: null,
  projects:[],

  createProject: async (data) => {
    try {
      set({ loading: true })
      await projectService.createProject(data)
      set({ loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

   getProjects: async () => {
    try {
      set({ loading: true })
      const res=await projectService.getProjectsService();
    //   console.log(res);
      
      set({ projects:res.data ,loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  updateProject: async (id, data) => {
  try {
    set({ loading: true });
    
    const updatedProject = await projectService.updateProjectService(id, data);
    
    set((state) => ({
      projects: state.projects.map((p) =>
        p._id === updatedProject._id ? updatedProject : p
      ),
      loading: false
    }));
  } catch (err) {
    set({ error: err.message, loading: false });
  }
},


}))
