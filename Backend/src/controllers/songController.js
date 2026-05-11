const pool=require("../config/db.js")
exports.getSongbyartist=async(req,res)=>{
    const result1=await pool.query(`
        Select*
        from artists
        where artist_id=$1`,[req.params.artist_id]
    )
    if(result1.rowCount===0)
    {
        return res.send({message:"Artist does not exist!"})
    }
    else
    {
        const result=await pool.query(`
            Select s.*,TRIM(artist_fname || ' ' || COALESCE(artist_lname, '')) AS artist_name
            from songs s
            left join artists ar using(artist_id)
            where ar.artist_id=$1`,[req.params.artist_id]
        )
        if(result.rows.length===0)
            return res.send({message: "No songs yet for this artist 🎤 Be the first to vibe here!"})
        else
            return res.send(result.rows)
    }
}
exports.search=async(req,res)=>{
    const q=`%${req.query.q}%`
    const songResults=await pool.query(
        `Select *
        from songs
        where song_name ilike $1`,[q]
    )
    const artistResults = await pool.query(
        `SELECT artist_id,TRIM(artist_fname || ' ' || COALESCE(artist_lname, '')) AS artist_name,image_url
        FROM artists ar
        WHERE TRIM(artist_fname || ' ' || COALESCE(artist_lname, '')) ILIKE $1`,
        [`%${q}%`]
    );
    return res.send({songs:songResults.rows,artists:artistResults.rows}) 
}
exports.getASongInfo=async(req,res)=>{
    const result=await pool.query(
        `Select *
        From songs
        Where song_id=$1`,[req.params.song_id]
    )
    if(result.rowCount===0)
        return res.send({message:"This song does not exist!"})
    else
        return res.send(result.rows[0])
}
exports.playSong=async(req,res)=>{
    const result=await pool.query(
        `UPDATE songs
        SET plays = plays + 1
        WHERE song_id = $1
        RETURNING *`,[req.params.song_id]
    )

    if(result.rowCount===0)
        return res.send({message:"This song does not exist!"})
    else
        return res.send({message:"Song playing right now"})
}
exports.addRecent = async (req, res) => {
    const user_id = req.user.user_id
    const result=await pool.query(
        `Select *
        From songs
        Where song_id=$1`,[req.params.song_id]
    )
    if(result.rowCount===0)
        return res.send({message:"This song does not exist!"})
    else
    {
        await pool.query(
            `INSERT INTO recently_played (user_id, song_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, song_id)
            DO UPDATE SET played_at = CURRENT_TIMESTAMP`,[user_id, req.params.song_id]
        )
        return res.send({message:'Added to recents!'})
    }
}
exports.getRecent=async(req,res)=>{
    const result=await pool.query(
        `Select s.* ,TRIM(ar.artist_fname || ' ' || COALESCE(ar.artist_lname, '')) AS artist_name
        from songs s
        join recently_played rp
        on s.song_id=rp.song_id
        left join artists ar using(artist_id)
        where rp.user_id=$1
        order by rp.played_at DESC
        limit 8`,[req.user.user_id]
    )
    if(result.rowCount===0)
        return res.send({message:"No songs listened recently 🙁"})
    else
        return res.send(result.rows)
}   
exports.getOldSongs=async(req,res)=>{
    const result=await pool.query(
        `Select s.*,TRIM(ar.artist_fname || ' ' || COALESCE(ar.artist_lname, '')) AS artist_name 
        from songs s
        join recently_played rp
        on s.song_id=rp.song_id
        left join artists ar using(artist_id)
        where rp.user_id=$1 and rp.played_at <= NOW() - INTERVAL '1 minute' 
        order by rp.played_at DESC
        limit 10
        `,[req.user.user_id]
    )
    if(result.rowCount===0)
        return res.send({message:"You don't have any old listening history🙁"})
    else
        return res.send(result.rows)
}
exports.getAllSongs=async(req,res)=>{
    const result=await pool.query(
        `Select s.*,TRIM(ar.artist_fname || ' ' || COALESCE(ar.artist_lname, '')) AS artist_name,a.album_name 
        from songs s
        left join artists ar using(artist_id)
        left join albums a using(album_id)`
    )
    res.send(result.rows)
}