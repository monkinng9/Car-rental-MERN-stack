const asyncHandler = require('express-async-handler');
const RentCarForm = require('../../models/end-user/rentCarFormModel');
const CarItem = require('../../models/carItemModel');



// @availabale  End-user
// @desc        Create Rent Car Form
// @route       POST /api/end-user/car-item/rentCarForm/:id
// @access      Private
const rentCarForm = asyncHandler(async (req, res) => {
  const carItem = await CarItem.findById(req.params.id);
  const rentCarform = await RentCarForm.find({ user: req.user.id });

  let foundRentFormExists
    = rentCarform.findLast(rentCarform => rentCarform.status === 'Rented');

  if (foundRentFormExists) {
    res.status(400);
    throw new Error('You already rent a car');
  }

  if (!carItem) {
    res.status(400);
    throw new Error('Car not foud!');
  }

  if (req.user.role != 'end-user') {
    res.status(400);
    throw new Error('This function available for end-user.');
  }

  let newRentCarFrom = RentCarForm.create({
    user: req.user.id,
    carItemID: req.params.id,
    carID: carItem['carID'],
    carType: carItem['carType'],
    status: 'Rented',
    dueTime: req.body.dueTime,
  });

  res.status(200).json(newRentCarFrom);
});

// @availabale  End-user
// @desc        Get Rent Car Form with specific User
// @route       GET /api/end-user/car-item/rentCarForm/
// @access      Private
const getRentCarForm = asyncHandler(async (req, res) => {
  const rentCarForm = await RentCarForm.find({ user: req.user.id });

  if (!rentCarForm) {
    res.status(400);
    throw new Error('Form not foud!');
  }
  if (req.user.role != 'end-user') {
    res.status(400);
    throw new Error('This function available for end-user.');
  }
  res.status(200).json(rentCarForm);
});

// @availabale  End-user
// @desc        Update Rent Car Form with specific User
// @route       PUT /api/end-user/car-item/rentCarForm/:id
// @access      Private
const updateRentCarForm = async (req, res) => {
  const rentCarform = await RentCarForm.findById(req.params.id);

  if (!rentCarform) {
    res.status(400);
    throw new Error('Form not found!')
  }

  if (req.user.role != 'end-user') {
    res.status(400);
    throw new Error('This function available for end-user.');
  }

  const updateCarForm = await RentCarForm.findByIdAndUpdate(req.params.id, req.body, {new: true}); 

  res.status(200).json({ message: `Update car item ${req.params.id}` });
}

module.exports = {
  rentCarForm,
  getRentCarForm,
  updateRentCarForm,
}