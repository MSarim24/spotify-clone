const express=require('express')
const cors=require('cors')
const app=express()
const authRoutes=require('./src/routes/authRoutes')
const songRoutes=require('./src/routes/songRoutes')
const likedRoutes=require('./src/routes/userRoutes')
const playlistRoutes=require("./src/routes/playlistRoutes")
const artistRoutes=require("./src/routes/artistRoutes")
const albumRoutes=require("./src/routes/albumRoutes")

app.use(express.json())
app.use("/uploads", express.static("uploads"));
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use("/api/auth",authRoutes)
app.use("/api/songs",songRoutes)
app.use("/api/liked",likedRoutes)
app.use("/api/playlists",playlistRoutes)
app.use("/api/artists",artistRoutes)
app.use("/api/albums",albumRoutes)

const port=5001
app.listen(port,()=>{
    console.log(`Successfully connected to port: ${port}`)
})