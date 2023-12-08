const { hashPassword } = require("../helpers/passhasher");
const { connection } = require("../config/connection");

const checkIfUserExists = async (userData) => {
  const [userRow] = await connection
    .promise()
    .query(`SELECT email FROM user WHERE email = ?`, [userData.email]);

  return userRow.length > 0;
};

const addUser = async (userData) => {
  const securePassword = await hashPassword(userData.password);
  await connection
    .promise()
    .query(
      `INSERT INTO user (username,email,password,location) VALUES (?,?,?,?)`,
      [userData.username, userData.email, securePassword, userData.location]
    );
};

const getUserId = async (email) => {
  const [userId] = await connection
    .promise()
    .query(`SELECT user_id FROM user WHERE email = ? `, [email]);
  const user_id = userId[0].user_id;
  return user_id;
};

const getUserPassword = async (loginData) => {
  const [ispassword] = await connection
    .promise()
    .query(`SELECT password FROM user WHERE email = ?`, [loginData.email]);
  console.log(ispassword);
  const password = ispassword[0].password;
  console.log(password);
  return password;
};

module.exports = { addUser, checkIfUserExists, getUserId, getUserPassword };
