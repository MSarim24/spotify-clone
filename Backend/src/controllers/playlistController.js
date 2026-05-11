const pool=require('../config/db.js')

exports.createPlaylist=async(req,res)=>{
    const result=await pool.query(
        `Insert into playlists(playlist_name,user_id,description)
        Values($1,$2,$3) Returning*`,[req.body.playlist_name,req.user.user_id,req.body.description]
    )
    res.send({message:"Playlist Created!"})
}
exports.deletePlaylist=async(req,res)=>{
    const result=await pool.query(
        `Delete
        From playlists
        Where playlist_id=$1 And user_id=$2`,[req.params.playlist_id,req.user.user_id]
    )
    if(result.rowCount===0)
        return res.send({message:"Playlist does not exist"})
    else
        return res.send({message:"Deleted this playlist"})
}

exports.addSong=async(req,res)=>{
    const check=await pool.query(
        `Select *
        from playlist_songs
        where song_id=$1 and playlist_id=$2`,[req.body.song_id,req.body.playlist_id]
    )
    if(check.rowCount>0)
    {
        return res.send({message:"Song already exists in playlist"})
    }
    else
    {
        await pool.query(
            `Insert into playlist_songs(song_id,playlist_id) 
            Values($1,$2)`,[req.body.song_id,req.body.playlist_id]
        )
        res.send({message:"Song added"})
    }
}

exports.removeSongs=async(req,res)=>{
    const result=await pool.query(
        `Delete 
        From playlist_songs
        Where song_id=$1 and playlist_id=$2`,
        [req.body.song_id,req.body.playlist_id]
    )
    if(result.rowCount===0)
    {
        return res.send({message:"Song not found in playlist"})
    }
    return res.send({message:"Song removed"})
}

exports.getAllplaylists=async(req,res)=>{
    const result=await pool.query(
        `Select p.*,u.user_name
        From playlists p
        join users u using(user_id)
        Where u.user_id=$1`,[req.user.user_id])
    if(result.rowCount===0)
        return res.send({message:"You have no playlists!"})
    else
        return res.send(result.rows)
}

exports.getAPlaylistSongs=async(req,res)=>{
    const result=await pool.query(
        `Select s.*,TRIM(ar.artist_fname || ' ' || COALESCE(ar.artist_lname, '')) AS artist_name,a.album_name
        From playlist_songs ps
        join songs s on s.song_id=ps.song_id
        left join artists ar using(artist_id)
        left join albums a on a.album_id=s.album_id
        where ps.playlist_id=$1`,[req.params.playlist_id]
    )
    return res.send(result.rows)
}

exports.getAPlaylistDetails=async(req,res)=>{
    const result=await pool.query(
        `Select p.*,u.user_name
        from playlists p
        join users u using(user_id)
        where u.user_id=$1 and p.playlist_id=$2`,[req.user.user_id,req.params.playlist_id]
    )
    res.send(result.rows[0])
}

exports.RenamePlaylist=async(req,res)=>{
    const result=await pool.query(
        `Update playlists
        set playlist_name=$1
        where playlist_id=$2 Returning*`,[req.body.playlist_name,req.params.playlist_id]
    )
    if(result.rowCount===0)
        return res.send({message:"Playlist does not exist!"})
    else
        return res.send({message:"Playlist name updated!"})
}