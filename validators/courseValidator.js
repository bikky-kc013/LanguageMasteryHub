const joi = require("joi");

const validateCourse = joi.object({
    course_name: joi.string().required(),
    course_price: joi.number().required().default(100)
});


const validateSeriesData = joi.object({
    series_name: joi.string().required(),
    series_description: joi.string().required(),
    course_id:joi.number().required()
});


const validatePlaylist = joi.object({
    section: joi.string().required(),
    thumbnail: joi.string().required(),
    description: joi.string().required(),
    author: joi.string().required(),
    author_image: joi.string(),
    course_id:joi.number().required(),
    series_id: joi.number().required()
});


module.exports = { validateCourse, validateSeriesData, validatePlaylist };