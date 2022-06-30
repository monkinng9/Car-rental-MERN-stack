const express = require('express');
const router = express.Router();
const { rentCarItem } = require('../../controllers/end-user/carItemController.end-user');
const { rentCarForm } = require('../../controllers/end-user/rentCarFormControllerEndUser')
const { protect } = require('../../middleware/authMiddleware');

router.put('/rent/:id', protect, rentCarItem);

router.post('/rentCarForm/:id', protect, rentCarForm);

module.exports = router;
