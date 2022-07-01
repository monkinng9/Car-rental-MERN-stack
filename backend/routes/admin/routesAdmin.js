const express = require('express');
const router = express.Router();
const {deleteCarItem, createCarItem, updateCarItem} = require('../../controllers/admin/carItemController.admin');
const { deleteCarForm } = require('../../controllers/admin/rentCarFormControllerAdmin')
const { protect } = require('../../middleware/authMiddleware');

router.post('/car/', protect, createCarItem);
router.delete('/car/:id', protect, deleteCarItem);
router.put('/car/:id', protect, updateCarItem);

router.delete('/rentCarForm/:id', protect, deleteCarForm);

module.exports = router;
