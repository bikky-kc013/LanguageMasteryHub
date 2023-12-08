const bcrypt  = require("bcrypt");
const isValid = async (userPassword, enteredPassword)=>{
    const isValid = await bcrypt.compare(enteredPassword,userPassword);
    return isValid;
}

module.exports = { isValid };