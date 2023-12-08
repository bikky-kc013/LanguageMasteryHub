const { connection } = require("../config/connection");

const checkIfCourseExists = async (courseName) => {
  const [existingCourses] = await connection
    .promise()
    .query(`SELECT course_name FROM course WHERE course_name = ? `, [
      courseName,
    ]);

  return existingCourses.length > 0;
};


const addCourse = async (courseData) => {
  const courseName = courseData.course_name;
  let originalCourseName = courseName;
  if (await checkIfCourseExists(courseName)) {
    let suffix = 1;
    let newCourseName = `${originalCourseName}${suffix}`;
    while (await checkIfCourseExists(newCourseName)) {
      suffix++;
      newCourseName = `${originalCourseName}${suffix}`;
    }
    courseData.course_name = newCourseName;
  }
  await connection
    .promise()
    .query(`INSERT INTO course (course_name, course_price) VALUES (?,?)`, [
      courseData.course_name,
      courseData.course_price,
    ]);
};



const addSeriesData = async (seriesData) => {
  await connection
    .promise()
    .query(
      `INSERT INTO series (series_name,seires_description,course_id) VALUES (?,?,?)`,
      [
        seriesData.series_name,
        seriesData.series_description,
        seriesData.course_id,
      ]
    );
};



const addPlayList = async (playList) => {
  await connection
    .promise()
    .query(
      `INSERT INTO playlist (section,thumbnail,description,author,author_image,course_id,series_id) VALUES (?,?,?,?,?,?,?)`,
      [
        playList.section,
        playList.thumbnail,
        playList.description,
        playList.author,
        playList.author_image,
        playList.course_id,
        playList.series_id,
      ]
    );
};



const getCourseId = async (courseData) => {
  const [courseId] = await connection
    .promise()
    .query(`SELECT course_id FROM course WHERE course_name = ?`, [
      courseData.course_name,
    ]);
  const course_id = courseId[0].course_id;
  return course_id;
};



const getPlaylist = async () => {
  const [rows] = await connection.promise().query(`
  SELECT 
    course.course_name,
    course.course_price,
    series.series_name,
    playlist.section,
    playlist.thumbnail,
    playlist.description,
    playlist.author
FROM 
    playlist
JOIN
    course ON playlist.course_id  = course.course_id 
JOIN 
    series ON playlist.series_id = series.series_id 
  `);
  return rows;
};




const addToCart = async (cartData) => {
  console.log(cartData.user_id);
  connection
    .promise()
    .query(
      `INSERT INTO cart (user_id, course_id, series_id)  VALUES (?,?,?)`,
      [cartData.user_id, cartData.course_id, cartData.series_id],
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );
};




const getCart = async () => {
  const [row] = await connection.promise().query(`
 SELECT 
   user.username,
   course.course_name,
   course.course_price,
   series.series_name
FROM 
   cart
JOIN
   user ON cart.user_id = user.user_id
LEFT JOIN
   course ON cart.course_id = course.course_id
LEFT JOIN 
   series ON cart.series_id = series.series_id;
  `);
  console.log(row);
  return row;
};



module.exports = {
  addCourse,
  addSeriesData,
  addPlayList,
  getCourseId,
  checkIfCourseExists,
  getPlaylist,
  addToCart,
  getCart,
};
