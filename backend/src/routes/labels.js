const express = require('express');
const LabelsController = require('../controllers/labelsController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', LabelsController.getLabels);
router.post('/', LabelsController.createLabel);
router.delete('/:id', LabelsController.deleteLabel);

module.exports = router;
