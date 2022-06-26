const express = require('express');
const router = express.Router();
const { rentCarItem } = require('../controllers/end-user/carItemController.end-user');
const { protect } = require('../middleware/authMiddleware');

router.put('/rent/:id', protect, rentCarItem);

module.exports = router;
