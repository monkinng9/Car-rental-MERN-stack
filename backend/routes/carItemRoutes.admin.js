const express = require('express');
const router = express.Router();
const {deleteCarItem, createCarItem, updateCarItem} = require('../controllers/admin/carItemController.admin');
const { protect } = require('../middleware/authMiddleware');

router.post('/car/', protect, createCarItem);

router.delete('/car/:id', protect, deleteCarItem);

router.put('/car/:id', protect, updateCarItem);

module.exports = router;
