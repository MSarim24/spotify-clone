const router = require('express').Router()
const songController=require('../controllers/songController.js')
const {auth}=require('../middleware/authMiddleware.js')

router.get("/songByArtist/:artist_id",auth,songController.getSongbyartist)
router.get("/search",auth,songController.search)
router.get("/songInfo/:song_id",auth,songController.getASongInfo)
router.get("/getRecentSongs",auth,songController.getRecent)
router.get("/getAllSongs",auth,songController.getAllSongs)
router.get("/getOldSongs",auth,songController.getOldSongs)
router.put("/playSong/:song_id",auth,songController.playSong)
router.post("/addToRecent/:song_id",auth,songController.addRecent)

module.exports=router