import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
    const query = req.query;
    console.log(query);
    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
                price: {
                    gte: query.minPrice ? parseInt(query.minPrice) : undefined,
                    lte: query.maxPrice ? parseInt(query.maxPrice) : undefined,
                },
            },
        });

        // Return an empty array with a 200 status if no posts are found
        // setTimeout(()=>{
            res.status(200).json(posts);
        // },3000)
    } catch (err) {
        console.error("Error fetching posts: ", err);
        res.status(500).json({ message: "Failed to get posts" });
    }
};


// export const getPost = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const post = await prisma.post.findUnique({
//             where: { id },
//             include: {
//                 postDetail: true, // Fetch post detail (can be null)
//                 user: {
//                     select: {
//                         username: true,
//                         avatar: true,
//                     },
//                 },
//             },
//         });

//         if (!post) {
//             return res.status(404).json({ message: "Post not found" });
//         }

//         res.status(200).json(post);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Failed to get post" });
//     }
// };

export const getPost = async (req, res) => {
    const id = req.params.id;
    const token = req.cookies.token;

    let userId = null;

    if (token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            userId = payload.id;
        } catch (err) {
            console.log("JWT verification failed:", err);
        }
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });

        const saved = userId
            ? await prisma.savedPost.findUnique({
                  where: {
                      userId_postId: {
                          postId: id,
                          userId,
                      },
                  },
              })
            : null;

        res.status(200).json({ ...post, isSaved: !!saved });
    } catch (err) {
        console.error("Error fetching post:", err);
        res.status(500).json({ message: "Failed to get post" });
    }
};




// export const addPost = async (req, res) => {
//     const body = req.body;
//     const tokenUserId = req.userId; // Get the user ID from the request

//     console.log("User ID:", tokenUserId); // Log the user ID for debugging

//     try {
//         const newPost = await prisma.post.create({
//             data: {
//                 ...body.postData,
//                 userId: tokenUserId, // Set the user ID here
//                 postDetail: {
//                     create: body.postDetail,
//                 },
//             },
//         });

//         res.status(200).json(newPost);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to add post" });
//     }
// };

export const addPost = async (req, res) => {
    const { postData, postDetail } = req.body;
    const tokenUserId = req.userId;

    if (!postData || !tokenUserId) {
        return res.status(400).json({ message: "Post data and user ID are required" });
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                ...postData,
                userId: tokenUserId, // Ensure userId is valid and matches the ObjectId type expected in MongoDB
                postDetail: postDetail ? { create: postDetail } : undefined,
            },
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.error("Error in addPost:", err);
        res.status(500).json({ message: "Failed to add post",error:err.message });
    }
};






export const updatePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const updateData = req.body;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: { postDetail: true }, // ✅ Include postDetail for checking
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized" });
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                title: updateData.title,
                price: parseInt(updateData.price),
                address: updateData.address,
                city: updateData.city,
                bedroom: parseInt(updateData.bedroom),
                bathroom: parseInt(updateData.bathroom),
                type: updateData.type,
                property: updateData.property,
                latitude: updateData.latitude,
                longitude: updateData.longitude,
                images: updateData.images,

                // ✅ Update postDetail only if it exists
                postDetail: post.postDetail
                    ? {
                        update: {
                            desc: updateData.postDetail?.desc,
                            utilities: updateData.postDetail?.utilities,
                            pet: updateData.postDetail?.pet,
                            income: updateData.postDetail?.income,
                            size: parseInt(updateData.postDetail?.size),
                            school: parseInt(updateData.postDetail?.school),
                            bus: parseInt(updateData.postDetail?.bus),
                            restaurant: parseInt(updateData.postDetail?.restaurant),
                        },
                    }
                    : undefined, // If no postDetail, don't update
            },
        });

        res.status(200).json(updatedPost);
    } catch (err) {
        console.log("Error updating post:", err);
        res.status(500).json({ message: "Failed to update post" });
    }
};



export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized" });
        }

        await prisma.post.delete({
            where: { id },
        });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete post" });
    }
};
