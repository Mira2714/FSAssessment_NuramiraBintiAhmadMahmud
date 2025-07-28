const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseController');
const validateCourse = require('../middlewares/validation');

router.get('/', controller.getCourses);
router.get('/:id', controller.getCourseById);
router.post('/', validateCourse, controller.createCourse);
router.put('/:id', validateCourse, controller.updateCourse);
router.delete('/:id', controller.softDeleteCourse);

module.exports=router;