const express = require('express');
const router = express.Router();
const { getCarItems, createCarItem, updateCarItem, deleteCarItem} = require('../controllers/carItemController');

router.get('/', getCarItems); 

router.post('/', createCarItem); 

router.put('/:id', updateCarItem); 

router.delete('/:id',  deleteCarItem); 

module.exports = router;