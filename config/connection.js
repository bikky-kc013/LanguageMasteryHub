const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
});

const createConnection = async () => {
  try {
    await connection.promise().connect();
    console.log(`Connected to the database`);
  } catch (error) {
    console.log(error);
  }
};

connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  (error, result) => {
    if (error) {
      console.log(error);
    }
    connection.query(`USE ${process.env.DB_NAME}`, (error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(`Using the database ${process.env.DB_NAME}`);
    });
    createTable();
  }
);

const createTable = () => {
  connection.query(
    `CREATE TABLE IF NOT EXISTS user(
        user_id char(36) PRIMARY KEY DEFAULT (UUID()),
        username VARCHAR(250) NOT NULL,
        email VARCHAR(250) NOT NULL,
        password VARCHAR(250) NOT NULL,
        location VARCHAR(250) NOT NULL
    )`,
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );

  connection.query(`CREATE TABLE IF NOT EXISTS course (
        course_id INT AUTO_INCREMENT PRIMARY KEY,
        course_name VARCHAR(255) NOT NULL,
        course_price DECIMAL(10, 2) NOT NULL
    );`);

  connection.query(`CREATE TABLE IF NOT EXISTS series (
        series_id INT AUTO_INCREMENT PRIMARY KEY,
        series_name VARCHAR(250),
        seires_description VARCHAR(1000),
        course_id INT,
        FOREIGN KEY (course_id) REFERENCES course(course_id)
    )`);
  connection.query(`CREATE TABLE IF NOT EXISTS playlist(
        playlist_id INT AUTO_INCREMENT PRIMARY KEY,
        section VARCHAR(500),
        thumbnail VARCHAR(250),
        description VARCHAR(1000),
        author VARCHAR(1000),
        author_image VARCHAR(500),
        course_id INT,
        series_id INT,
        FOREIGN KEY (course_id) REFERENCES course (course_id),
        FOREIGN KEY (series_id) REFERENCES series (series_id)
    )`);

  connection.query(
    `CREATE TABLE IF NOT EXISTS cart ( 
      cart_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id CHAR(36),
      course_id INT NULL,
      series_id INT NULL,
      FOREIGN KEY (user_id) REFERENCES user(user_id),
      FOREIGN KEY (course_id) REFERENCES course (course_id),
      FOREIGN KEY (series_id) REFERENCES series(series_id)
    )`,
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
};

module.exports = { connection, createConnection };
