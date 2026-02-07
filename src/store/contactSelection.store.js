import { create } from "zustand";
import { getContact } from "../services/message.service";

export const useContacts = create((set) => ({
  myContacts: [],
  selectedContact: null,
  contactLoading: false,

  getContactCall: async () => {
    set({ contactLoading: true });

    try {
      const res = await getContact();
      // console.log(res);
      
      if (res) {
        // ✅ immutable update ensures re-render
        set({ myContacts: [...res] }); 
        return res;
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      set({ contactLoading: false }); // ✅ only once
    }
  },



  selectedContactPerson:(data)=>{
    set({selectedContact:data})
  }




}));
