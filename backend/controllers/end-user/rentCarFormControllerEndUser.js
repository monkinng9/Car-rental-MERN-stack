const asyncHandler = require('express-async-handler');
const RentCarForm = require('../../models/end-user/rentCarForm');
const CarItem = require('../../models/carItemModel');

// @availabale  End-user
// @desc        Rent Car
// @route       POST /api/end-user/car-item/rentCarForm/:id
// @access      Private
const rentCarForm = asyncHandler(async (req, res) => {
  const carItem = await CarItem.findById(req.params.id);
  

  if(!carItem) {
    res.status(400);
    throw new Error('Car not foud!');
  }

  if(req.user.role != 'end-user') {
    res.status(400);
    throw new Error('This function available for end-user.');
  }
  
  let newRentCarFrom = RentCarForm.create({
    user: req.user.id,
    carItemID: req.params.id,
    carID: carItem['carID'],
    status: 'Rented',
    dueTime: req.body.dueTime,
  });

  res.status(200).json(newRentCarFrom);
});

module.exports = {
  rentCarForm
}