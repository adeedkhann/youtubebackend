import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/claudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { response } from "express"
const registerUser = asyncHandler(async (req , res)=>{
   
    // get user details from frontend
    // validation - not empty
    // check if user already exists : username / email
    // check for images , check for avatar
    // upload them to cloudinaryv,avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {fullname , email , username , password} = req.body
    console.log("email : " , email);

    if(
        [fullname , email , username , password].some((field)=>(
            field?.trim() === ""
        ))
    ){
        throw new ApiError(400 , "All fields are required")
    }

    const existedUser = await User.findOne({ 
        $or : [{email},{username}] //  ot laga dia dollar se , first wala ajayega
    })
    if(existedUser){
        throw new ApiError(409 , "username or email already exist")
    }

    const avatarLocalPath =  req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.cover?.[0]?.path;
    
    if(!avatarLocalPath){
        throw new ApiError(400 , "avatar is required")
       
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const cover = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400 , "avatar is required claudinary not working")
    }

    const user = await User.create({
        fullname,
        avatar : avatar.url,
        cover : cover?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" // jo jo nahi chaiye usko likhdo baki sab kuch ajayega
    )
    if(!createdUser){
        throw new ApiError(400 , "somethign went wrong whiler registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200 , createdUser , "User registered successfully")
    )


})

export {registerUser}


