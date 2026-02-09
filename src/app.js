import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,
}))

app.use(express.json({limit : "16kb"}))
 
app.use(express.urlencoded({extended : true , limit : "16kb"})) //extended se obj ke andsr bhi obj desakte hai ,
app.use(express.static("public")) //static file f0lder store karne ke liye publuc assets anyone can assess
app.use(cookieParser()) //cookies ke liye server me



export {app}