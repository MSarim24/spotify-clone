const pool=require('../config/db.js')

exports.follow=async(req,res)=>{
    await pool.query(
        `Insert into followed_artists(user_id,artist_id)
        Values($1,$2)`,[req.user.user_id,req.params.artist_id]
    )
    return res.send({message:"Followed!"})
}
exports.unfollow=async(req,res)=>{
    const result=await pool.query(
        `Delete
        From followed_artists
        Where artist_id=$1 And user_id=$2`,[req.params.artist_id,req.user.user_id]
    )
    return res.send({message:"Unfollowed!"})
}
exports.getFollowed=async(req,res)=>{
    const result=await pool.query(
        `Select ar.artist_id,TRIM(ar.artist_fname || ' ' || COALESCE(ar.artist_lname, '')) AS artist_name,about,image_url
        From artists ar
        Join followed_artists fa on ar.artist_id=fa.artist_id
        Where fa.user_id=$1`,[req.user.user_id]
    )
    return res.send(result.rows)
}

exports.getRecentArtists=async(req,res)=>{
    const result=await pool.query(
        `SELECT DISTINCT ON (a.artist_id) a.*, r.played_at
         FROM recently_played r
         JOIN songs s ON s.song_id = r.song_id
         JOIN artists a ON a.artist_id = s.artist_id
         WHERE r.user_id = $1
         ORDER BY a.artist_id, r.played_at DESC
         LIMIT 7`,
        [req.user.user_id]
    )

    if(result.rowCount===0)
        return res.send({message:"You haven't listened to any artists recently🙁"})
    else
        return res.send(result.rows)
}

exports.getArtistDetails=async(req,res)=>{
    const result=await pool.query(
        `Select artist_id,TRIM(ar.artist_fname || ' ' || COALESCE(ar.artist_lname, '')) AS artist_name,about,image_url
        From artists ar
        where artist_id=$1`,[req.params.artist_id]
    )
    res.send(result.rows[0])
}