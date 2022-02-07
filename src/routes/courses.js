const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

// !Get Course
router.get('/create', courseController.create);
router.get('/:id/edit', courseController.edit);
router.post('/store', courseController.store);
router.post('/handle-form-actions', courseController.handleFormActions);
router.get('/:slug', courseController.show);

// !Update Course
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);

// !Delete Course
router.delete('/:id', courseController.delete);
router.delete('/:id/forceDelete', courseController.forceDelete);


module.exports = router;
