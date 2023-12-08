const { addCourses, addSeries, addPlayLists, getPlaylistData } = require("../controllers/courseControllers");
const { verifyToken } = require("../validators/jwtValidators");
const express = require("express");
const courseRouter = express.Router();



courseRouter.post("/addCourse", verifyToken, addCourses);
courseRouter.post("/addSeries",verifyToken, addSeries);
courseRouter.post("/addPlayList",verifyToken, addPlayLists);
courseRouter.get("/getPlaylistData",verifyToken, getPlaylistData);

module.exports  =  { courseRouter };