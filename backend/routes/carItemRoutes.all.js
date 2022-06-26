const express = require('express');
const router = express.Router();
const { getCarItems } = require('../controllers/carItemController.all');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCarItems);

module.exports = router;
