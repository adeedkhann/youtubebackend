import { Router } from "express";
import { changeCurrentPassword, 
            getCurrentUser, 
            getUserChannelProfile, 
            getWatchHistory, 
            loginUser, 
            logoutUser, 
            registerUser, 
            updateAccountDetails, 
            updateUserAvatar, 
            updateUserCoverImage } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {refreshAccessToken} from "../controllers/user.controller.js"
import { uploadOnCloudinary } from "../utils/claudinary.js";

const router = Router();

router.route("/register").post(//middle ware execute kardiya
    upload.fields([
        {
            name : "avatar",
            maxCount : 1,
        },
        {
            name:"coverImage",
            maxCount:1,

        }

    ]), // .?
    registerUser
)


router.route("/login").post(loginUser)

// secured routes

router.route("/logout").post(verifyJWT , logoutUser)
router.route("refreshToken").post(refreshAccessToken)

router.route("/changePassword").post(verifyJWT,changeCurrentPassword)
router.route("/currentUser").get(verifyJWT , getCurrentUser)
router.route("/updateAccount").patch(verifyJWT ,updateAccountDetails)
router.route("/avatar").patch(verifyJWT ,upload.single("avatar") , updateUserAvatar)
router.route("/coverImage").patch(verifyJWT ,upload.single("/coverImage"),updateUserCoverImage)
//form params
router.route("/c/:username").get(verifyJWT , getUserChannelProfile)
router.route("/history").get(verifyJWT , getWatchHistory)


export default router;

