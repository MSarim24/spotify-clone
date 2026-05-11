const pool=require("../config/db.js")
exports.getAlbumById=async(req,res)=>{
    const result=await pool.query(
        `Select*
        From albums
        where album_id=$1`,[req.params.album_id]
    )
    if(result.rowCount===0)
        return res.send({message:"Album not found"})
    else
        return res.send(result.rows[0])
}
exports.getAlbumsOfArtist=async(req,res)=>{
    const result=await pool.query(
        `Select *
        From albums
        Where artist_id=$1`,[req.params.artist_id]
    )
    res.send(result.rows)
}
exports.getSongsOfAlbum=async(req,res)=>{
    const result=await pool.query(
        `Select s.*,TRIM(ar.artist_fname || ' ' || COALESCE(ar.artist_lname, '')) AS artist_name
        From songs s
        join artists ar using(artist_id)
        Where s.album_id=$1`,[req.params.album_id]
    )
    res.send(result.rows)
}
exports.getAlbumDetails=async(req,res)=>{
    const result=await pool.query(
        `Select a.*,TRIM(ar.artist_fname || ' ' || COALESCE(ar.artist_lname, '')) AS artist_name,ar.image_url AS artist_image_url,Count(s.song_id) as total_songs,COALESCE(Sum(s.duration),0) as total_duration
        from albums a
        join artists ar using(artist_id)
        left join songs s using(album_id)
        where album_id=$1
        GROUP BY a.album_id, ar.artist_id`,[req.params.album_id]
    )
    res.send(result.rows[0])
}