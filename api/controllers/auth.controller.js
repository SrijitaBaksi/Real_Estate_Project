import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js";



export const register = async (req,res)=>{
    const {username, email,password } = req.body

    try{
        //hash the password
        const hashedPassword = await bcrypt.hash(password,10)

         console.log(hashedPassword)

        //create a new user and save to db
        const newUser = await prisma.user.create({
            data:{
                username,
                email,
                password:hashedPassword,
            },
        });

    console.log(newUser);
    res.status(201).json({message: "User created successfully"})
    
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unable to create user"})
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials!" });

        // Generate JWT token
        const age = 1000 * 60 * 60 * 24 * 7; // 7 days
        const token = jwt.sign(
            { id: user.id, isAdmin: false },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        // Remove password before sending user info
        const { password: userPassword, ...userInfo } = user;

        // Set cookie with JWT token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: age,
            sameSite: "None"
        });

        // Send user info + token in response
        res.status(200).json({
            message: "Login successful",
            token,   // Token for localStorage
            user: userInfo
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Failed to login" });
    }
};


export const logout =(req,res)=>{
    res.clearCookie("token").status(200).json({message:"Logout Successful"})
}