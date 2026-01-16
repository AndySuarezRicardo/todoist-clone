const express = require('express');
const ProjectsController = require('../controllers/projectsController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', ProjectsController.getProjects);
router.post('/', ProjectsController.createProject);
router.delete('/:id', ProjectsController.deleteProject);

module.exports = router;
