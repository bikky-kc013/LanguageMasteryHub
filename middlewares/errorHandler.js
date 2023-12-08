const createError = require("http-errors");

const undefinedRoute =((req,res,next)=>{
    res.json("This route is not defined");
});

const errorHandler = ((err, req,res,next)=>{
    res.json({
        errorName:err.name,
        errorMessage:err.message
        })
});



module.exports = { undefinedRoute, errorHandler };