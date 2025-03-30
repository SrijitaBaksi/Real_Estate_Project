import { defer } from "react-router-dom"
import apiRequest from "./apiRequests"

export const singlePageLoader = async ({request,params})=>{
    const res= await apiRequest("/posts/"+params.id)
    return res.data
}

export const listPageLoader = async ({request,params})=>{
    const query = request.url.split("?")[1]
    
    const postPromise=  apiRequest("/posts?"+query)
    return defer({
        postResponse: postPromise,
    })  
}

export const profilePageLoader = async ({request,params})=>{
    const postPromise= apiRequest("/users/profilePosts")  
    const chatPromise= apiRequest("/chats")  
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise,
    })  
}