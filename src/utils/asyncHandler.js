const asyncHandler = (requestHandler)=>{
    (req , res,next) =>{
        Promise.resolve(requestHandler(req , res , next))
        .catch((err) => next(err))
        
    }
}




export {asyncHandler}


//ek function ko doosre function me pass kardiya





//wrappeer function ye har jagah use krege 
// const asyncHandler = (fn)=> async (req,res,next) => {
//     try {
//         await fn(req , res , next)


//     } catch (error) {
//         res.status(error.code || 500).json({
//             success : failure,
//             message : error.message
//         })
//     }
// }