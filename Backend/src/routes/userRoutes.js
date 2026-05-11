const router=require('express').Router()
const userController=require("../controllers/userController.js")
const {auth}=require('../middleware/authMiddleware.js')

router.post("/likeSong/:song_id",auth,userController.likeSong)
router.delete("/unlikeSong/:song_id",auth,userController.unlikeSongs)
router.get("/getLikedSongs",auth,userController.getLikedSongs)
router.get("/getUserDetail",auth,userController.getUserDetail)
router.get("/countLiked",auth,userController.getLikedSongCount)
router.get("/getLikedById/:song_id",auth,userController.getLikedById)
module.exports=router