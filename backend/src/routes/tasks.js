const express = require('express');
const { body } = require('express-validator');
const TasksController = require('../controllers/tasksController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', TasksController.getTasks);
router.post('/',
  [
    body('title').notEmpty().trim(),
    body('description').optional().trim(),
    body('priority').optional().isInt({ min: 1, max: 4 })
  ],
  TasksController.createTask
);
router.put('/:id', TasksController.updateTask);
router.delete('/:id', TasksController.deleteTask);

module.exports = router;
