//jaate time mujhse milkar jaana

import multer from "multer";
 





const storage = multer.diskStorage({
  destination: function (req, file, cb) {//req jo json data hai , agar file bhi agayi to multer use hota hai 
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
   
    cb(null, file.originalname)
  }
})

export const upload = multer({ 
    storage,
})

