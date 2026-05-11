const router=require('express').Router()
const playlistController=require("../controllers/playlistController.js")
const {auth}=require('../middleware/authMiddleware.js')

router.get("/allPlaylists",auth,playlistController.getAllplaylists)
router.get("/aPlaylistSongs/:playlist_id",auth,playlistController.getAPlaylistSongs)
router.get("/playlistDetails/:playlist_id",auth,playlistController.getAPlaylistDetails)
router.post("/addSong",auth,playlistController.addSong)
router.post("/createPlaylist",auth,playlistController.createPlaylist)
router.delete("/removeSong",auth,playlistController.removeSongs)
router.delete("/deletePlaylist/:playlist_id",auth,playlistController.deletePlaylist)
router.put("/renamePlaylist/:playlist_id",auth,playlistController.RenamePlaylist)

module.exports=router