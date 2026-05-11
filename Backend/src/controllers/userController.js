const pool=require('../config/db.js')
exports.likeSong=async(req,res)=>{
    const check=await pool.query(
        `Select * from liked_songs
        where user_id=$1 and song_id=$2`,
        [req.user.user_id,req.params.song_id]
    )
    if(check.rows.length>0)
    {
        res.send({message:"Song already liked"})
    }
    else
    {
        await pool.query(
            `Insert into liked_songs(user_id,song_id) 
            Values($1,$2)`,
            [req.user.user_id,req.params.song_id]
        )
        res.send({message:"Liked"})
    }
}
exports.getLikedById=async(req,res)=>{
    const result=await pool.query(
        `Select *
        from liked_songs 
        where user_id=$1 and song_id=$2`,[req.user.user_id,req.params.song_id]
    )
    res.send({isliked:result.rows.length?true:false})
}
exports.unlikeSongs=async(req,res)=>{
    const result=await pool.query(
        `Delete from liked_songs
        where user_id=$1 and song_id=$2`,[req.user.user_id,req.params.song_id]
    )
    if(result.rowCount===0){
        res.send({message:"Song was not in liked songs"})
    }
    else{
        res.send({message:"Removed from liked songs"})
    }
}
exports.getLikedSongs=async(req,res)=>{
    const result=await pool.query(
        `Select s.*,a.album_name ,TRIM(ar.artist_fname || ' ' || COALESCE(ar.artist_lname, '')) AS artist_name
        from songs s 
        join liked_songs l on l.song_id=s.song_id
        left join albums a on a.album_id=s.album_id
        left join artists ar on ar.artist_id=s.artist_id
        where user_id=$1`,[req.user.user_id]
    )
    res.send({songs:result.rows,songCount:result.rowCount})
}
exports.getUserDetail=async(req,res)=>{
    const result=await pool.query(
        `Select user_name
        from users
        where user_id=$1`,[req.user.user_id]
    )
    res.send(result.rows[0])
}
exports.getLikedSongCount=async(req,res)=>{
    const result=await pool.query(
        `Select count(*) as songs_count
        from liked_songs
        where user_id=$1`,[req.user.user_id]
    )
    res.send(result.rows[0])
}