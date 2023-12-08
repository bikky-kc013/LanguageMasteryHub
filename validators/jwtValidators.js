const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const accessToken = async (userId)=>{
try{
    const payload = {userId};
    const secret = process.env.SECRET_KEY
    const options = { expiresIn:"1h"};
    const token  = await jwt.sign(payload,secret,options);
    return token;

}catch(error){
    next(error);
}
}




const verifyToken = async (req,res,next)=>{
    try{     
        console.log(isAllowed);
        if (!req.headers["authorization"]) { throw createError.Unauthorized("Sorry, unauthorized. No Authorization header found.") }
        const bearerToken = req.headers['authorization'].slice(7); 
        const verify = jwt.verify(bearerToken, process.env.SECRET_KEY, (error,payload)=>{
            if(error){
                throw createError.Unauthorized("Sorry, we cannon authorize you");
            } else {
                req.payload = payload;
            }
            next();
        });    
    }catch(error){
        next(error);
    }
}


module.exports = { accessToken, verifyToken };