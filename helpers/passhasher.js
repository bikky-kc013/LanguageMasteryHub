const bcrypt = require("bcrypt");

const hashPassword = async (userPassword)=>{
  try{
     const salt = 10;
     const securePassword = await bcrypt.hash(userPassword,salt);
     return securePassword;
}catch(error){
    console.log(error);
}
};


module.exports = { hashPassword };