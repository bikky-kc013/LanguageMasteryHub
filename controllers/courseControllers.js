const { validateCourse,validateSeriesData,validatePlaylist } = require("../validators/courseValidator");
const { addCourse,addSeriesData,addPlayList,getPlaylist } = require("../models/courseModel");
const createError = require("http-errors");

const addCourses = async (req, res, next) => {
  try {
    const courseData = await validateCourse.validateAsync(req.body);
    const saveCourse = await addCourse(courseData);
  } catch (error) {
    next(error);
  }
};

const addSeries = async (req, res, next) => {
  try {
    const seriesData = await validateSeriesData.validateAsync(req.body);
    const saveSeries = await addSeriesData(seriesData);
  } catch (error) {
    next(error);
  }
};

const addPlayLists = async (req, res, next) => {
  try {
    const playListData = await validatePlaylist.validateAsync(req.body);
    console.log(playListData)
    const saveData = await addPlayList(playListData);
  } catch (error) {
    next(error);
  }
};


const getPlaylistData  = async (req,res,next) =>{
try{
  const getData  = await getPlaylist();
  res.json( getData);
}catch(error){
  next(error);
}
}




module.exports = { addCourses, addSeries, addPlayLists, getPlaylistData };
