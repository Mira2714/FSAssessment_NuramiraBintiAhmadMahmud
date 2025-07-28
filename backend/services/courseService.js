const Course = require('../models/courseModel');

exports.getCourses = async ({ status, instructor_id }) => {
  const filter = { isDeleted: false };
  if (status) filter.status = status;
  if (instructor_id) filter.instructor_id = instructor_id;
  return await Course.find(filter);
};

exports.getCourseById = async (id) => {
  return await Course.findOne({ _id: id, isDeleted: false });
};

exports.createCourse = async (data) => {
  return await Course.create(data);
};

exports.updateCourse = async (id, data) => {
  return await Course.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true });
};

exports.softDeleteCourse = async (id) => {
  return await Course.findOneAndUpdate({ _id: id, isDeleted: false }, 
    { $set: {
        isDeleted: true,
        deleted_at: new Date()
      } 
    }, 
    { new: true });
};