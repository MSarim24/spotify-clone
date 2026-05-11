const {Pool}=require('pg');
require('dotenv').config();
const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
});
pool.connect()
.then(client=>{
    console.log("DB connected!");
    client.release();
})
.catch(err=>{
    console.log("DB connection error!",err);
});
module.exports=pool;