const courseService = require('../services/courseService');

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getCourses(req.query);
    console.log(courses.json);
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await courseService.getCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (err) {
    next(err);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

exports.softDeleteCourse = async (req, res, next) => {
  try {
    const course = await courseService.softDeleteCourse(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course soft deleted' });
  } catch (err) {
    next(err);
  }
};