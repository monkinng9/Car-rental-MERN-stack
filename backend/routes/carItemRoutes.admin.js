const express = require('express');
const router = express.Router();
const { getCarItems } = require('../controllers/carItemController.all');
const {deleteCarItem} = require('../controllers/admin/carItemController.admin');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCarItems);

router.delete('/:id', protect, deleteCarItem);



module.exports = router;
