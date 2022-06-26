const asyncHandler = require('express-async-handler');
const CarItem = require('../models/carItemModel');

// @availabale  End-user & Admin
// @desc        Get Car
// @route       GET /api/car-item/
// @access      Private
const getCarItems = asyncHandler(async (req, res) => {
  const carItems = await CarItem.find();
  
  res.status(200).json(carItems);
});

module.exports = {
  getCarItems
}