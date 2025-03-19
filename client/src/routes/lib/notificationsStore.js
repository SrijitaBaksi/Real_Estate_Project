import { create } from 'zustand'
import apiRequest from './apiRequests'

export const useNotificationStore= create((set) => ({
 numbers:0,
 fetch: async()=>{
    const res = await apiRequest("/users/notifications");
    set({number:res.data});
 },
 decrease:()=>{
    set(prev=>({number:prev.number-1}));
},

reset:()=>{
    set({number:0});
},

}))