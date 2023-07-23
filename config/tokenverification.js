const jwt=require('jsonwebtoken')
const {JWT_SECRET}=process.env

exports.verifyToken=(req, res)=>{
    const token=req.header('Authorization')
    console.log('Authorization Header:', req.header('Authorization'));


    if(!token){
        return res.json({
            msg:"Plz provide web token"
        })
    }

    jwt.verify(token, JWT_SECRET, (err, result)=>{
        if(err) throw err;

        req.customer=result;
    })
}
