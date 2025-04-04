import prisma from "../lib/prisma.js";

 

export const getChats=async(req,res)=>{
    const tokenUserId = req.userId
    if (!tokenUserId) {
        return res.status(400).json({ message: "Invalid token or user ID missing" });
    }
    try{
        const chats = await prisma.chat.findMany({
            where:{
                userIDs:{
                    hasSome:[tokenUserId],
                }
            }
        })

        for (const chat of chats){
            const receiverId = chat.userIDs.find((id)=>id != tokenUserId)
            const receiver = await prisma.user.findUnique({
                where:{
                    id: receiverId,
                },

                select:{
                    id:true,
                    username:true,
                    avatar:true,
                }
            })
            chat.receiver = receiver
        }
        res.status(200).json(chats);
    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to get chats"})
    }
}

export const getChat=async(req,res)=>{
    const tokenUserId=req.userId;
    try{
        const chat = await prisma.chat.findUnique({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId],
                },
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })

        await prisma.chat.update({
           where:{
            id:req.params.id,
           },
           data:{
            seenBy:{
                push:[tokenUserId],
            },
           },
        });
        res.status(200).json(chat);
    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to get chats"})
    }
}

export const addChat = async (req, res) => {
    const tokenUserId = req.userId;
    const { receiverId } = req.body; // Get receiverId from the request body

    if (!receiverId) {
        return res.status(400).json({ message: "Receiver ID is required" });
    }

    try {
        const newChat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, receiverId] // Ensure both user IDs are included
            }
        });
        res.status(200).json(newChat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create chat" });
    }
};

export const readChat=async(req,res)=>{
    const tokenUserId=req.userId;
    
    try{
        const chat = await prisma.chat.update({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId],
                },
            },
            data:{
                seenBy:{
                    set:[tokenUserId]
                }
            }
        })
        res.status(200).json(chat);
    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to get chats"})
    }
}