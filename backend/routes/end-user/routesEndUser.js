const express = require('express');
const router = express.Router();
const { rentCarItem } = require('../../controllers/end-user/carItemController.end-user');
const { rentCarForm, getRentCarForm, updateRentCarForm } = require('../../controllers/end-user/rentCarFormControllerEndUser')
const { protect } = require('../../middleware/authMiddleware');

router.put('/rent/:id', protect, rentCarItem);

router.post('/rentCarForm/:id', protect, rentCarForm);
router.get('/rentCarForm/', protect, getRentCarForm);
router.put('/rentCarForm/:id', protect, updateRentCarForm);

module.exports = router;
