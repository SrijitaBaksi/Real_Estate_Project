import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async (req,res)=>{
    try{
        const users= await prisma.user.findMany()
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to get users!"})
    }
}

export const getUser = async (req,res)=>{
    const id = req.params.id
    try{
        const user= await prisma.user.findUnique({
            where:{id},
        })
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to get user!"})
    }
}

export const updateUser = async (req,res)=>{
    const id = req.params.id
    const tokenUserId = req.userId
    const body=req.body
    const {password,avatar,...inputs} =req.body

    if(id!= tokenUserId){
        return res.status(403).json({message:"Not Authorized"})
    }
    let updatedPassword = null
    try{

        if(password){
            updatedPassword = await bcrypt.hash(password,10)
        }
        const updatedUser = await prisma.user.update({
            where:{id},
            data:{
                ...inputs,
                ...(updatedPassword && {password: updatedPassword}),
                ...(avatar && {avatar})
            }
        })

        const {password: userPassword,...rest} = updatedUser

        res.status(200).json(rest)
        
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to get users!"})
    }
}

export const deleteUser = async (req,res)=>{

    const id = req.params.id
    const tokenUserId = req.userId
   
    
    if(id!= tokenUserId){
        return res.status(403).json({message:"Not Authorized"})
    }

    try{
        await prisma.user.delete({
            where:{id}
        })
        res.status(200).json({message:"User deleted"})
        
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to get users!"})
    }
}    

export const savePost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    try {
        console.log("User ID:", tokenUserId);
        console.log("Post ID:", postId);

        // 🔍 Check if post is already saved
        const existingPost = await prisma.savedPost.findFirst({
            where: {
                userId: tokenUserId,
                postId: postId
            }
        });

        if (existingPost) {
            // ✅ If already saved, remove it (toggle behavior)
            await prisma.savedPost.delete({
                where: { id: existingPost.id }
            });
            return res.status(200).json({ message: "Post removed from saved list", isSaved: false });
        }

        // 🛑 Prevent duplicate entry (MongoDB does not enforce it)
        await prisma.savedPost.create({
            data: {
                userId: tokenUserId,
                postId: postId
            }
        });
        return res.status(200).json({ message: "Post saved", isSaved: true });

    } catch (err) {
        console.error("Save Post Error:", err);

        return res.status(500).json({ message: "Failed to save post!", error: err.message });
    }
};

export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId;  // Get userId from authenticated token
    console.log("Authenticated User ID:", tokenUserId);

    try {
        // Fetch user and their posts, but only posts where userId matches
        const userPosts = await prisma.user.findUnique({
            where: { id: tokenUserId }, // Ensure we fetch the correct user
            include: {
                posts: { 
                    where: { userId: tokenUserId } // Fetch only user's own posts
                }
            }
        });

        // Fetch saved posts for the authenticated user
        const saved = await prisma.savedPost.findMany({
            where: { userId: tokenUserId },
            include: { post: true }
        });

        // Extract only the post data from saved posts
        const savedPosts = saved.map((item) => item.post);

        res.status(200).json({ userPosts: userPosts?.posts || [], savedPosts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to get profile posts!" });
    }
};
export const getNotificationNumber = async (req,res)=>{
    const tokenUserId= req.userId;
    try{
       const number = await prisma.chat.count({
        where:{
            userIDs:{
                hasSome:[tokenUserId],
            },
            NOT:{
                seenBy:{
                    hasSome:[tokenUserId],
                }
            }
        }
       })
        res.status(200).json(number)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to get profile posts!"})
    }
}