const router = require('express').Router()
const albumController=require('../controllers/albumController.js')
const {auth}=require('../middleware/authMiddleware.js')

router.get("/albumById/:album_id",auth,albumController.getAlbumById)
router.get("/artistAlbum/:artist_id",auth,albumController.getAlbumsOfArtist)
router.get("/albumSongs/:album_id",auth,albumController.getSongsOfAlbum)
router.get("/albumDetails/:album_id",auth,albumController.getAlbumDetails)

module.exports=router