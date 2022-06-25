const express = require('express');
const router = express.Router();
const { getCarItems, createCarItem, 
  updateCarItem, deleteCarItem } = require('../controllers/carItemController');
const { protect } = require('../middleware/authMiddleware');


router.get('/', protect, getCarItems);

router.post('/', protect, createCarItem);

router.put('/:id', protect, updateCarItem);

router.delete('/:id', protect, deleteCarItem);

module.exports = router;
