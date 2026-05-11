const { generateToken } = require('../utils/jwt.js')
const pool=require('../config/db.js')
const bcrypt=require('bcrypt')

exports.register=async(req,res)=>{
    const {user_name,email,password}=req.body
    hashed=await bcrypt.hash(password,10)
    const result=await pool.query(
        `Insert into users(user_name,email,password) 
        Values($1,$2,$3) Returning*`,[user_name,email,hashed]
    )
    res.send(result.rows[0])
}
exports.login=async(req,res)=>{
    const {email,password}=req.body
    const result=await pool.query(`
        Select* 
        from users 
        where email=$1`,[email]
    )
    const user=result.rows[0]
    if(!user){
        return res.status(404).send({message:"No user found!"})
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match){
        return res.status(401).send({message:"Invalid password!"})
    }
    token=generateToken(user)
    res.send({token:token})
}