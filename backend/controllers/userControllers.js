import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";


const createUser =asyncHandler(async(req,res,next)=>{
    console.log(req.body)
      const {name , email, password , isAdmin } = req.body;

      if(!email || !name  || !password )
      {
         res.status(400)
        return next(new Error("Please provide  name , email and password"))
      }
       const user = await User.create({name ,email ,password,isAdmin});
       if(user)
        {
             return res.status(201).json({
                  _id:user._id,
                  name:user.name,
                  email:user.email,
                  isAdmin:user.isAdmin
             })
        }     
})


const login = asyncHandler(async(req,res)=>{
      const {email , password } = req.body;
      const user = await User.findOne({email});
      

      if (user && (await user.checkPassword(password))) {
        return res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
      }
})





const logout = asyncHandler(async(req,res)=>{
      res.status(200).json({message:"Logged out"})
})


const getUserProfile  = asyncHandler(async(req,res)=>{
       const users = await User.find({})
       console.log(users)
       res.status(201).json({
          users
       })
})

const getUser = asyncHandler(async(req,res)=>{
      const  { id }  =   req.params
       
      if(id)
      {
      const response = await User.findById(id);  
      res.send(response);
      }else{
         res.status(400).json({message:"Invalid id"})
      }
})

export { createUser, login, logout , getUserProfile ,getUser  };
