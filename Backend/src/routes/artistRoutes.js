const router=require('express').Router()
const artistController=require("../controllers/artistController.js")
const {auth}=require('../middleware/authMiddleware.js')

router.post("/followArtist/:artist_id",auth,artistController.follow)
router.delete("/unfollowArtist/:artist_id",auth,artistController.unfollow)
router.get("/recentArtist",auth,artistController.getRecentArtists)
router.get("/followedArtist",auth,artistController.getFollowed)
router.get("/ArtistDetail/:artist_id",auth,artistController.getArtistDetails)
module.exports=router