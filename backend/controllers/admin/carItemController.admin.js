const asyncHandler = require('express-async-handler');
const CarItem = require('../../models/carItemModel');


// @availabale  Admin
// @desc        Create Car
// @route       POST /api/admin/car-item
// @access      Private
const createCarItem = asyncHandler(async (req, res) => {

  if(!req.body.carID || !req.body.carType) {
    res.status(400);
    throw new Error('Please add a ID car and type of car');
  }

  if(req.user.role != 'admin') {
    res.status(400);
    throw new Error('This function available for admin.');
  }

  const carItem = await CarItem.create({
    carID: req.body.carID,
    carType: req.body.carType,
    carAvailable: true,
  });

  res.status(200).json(carItem);

})

// @availabale  Admin
// @desc        Create Car
// @route       POST /api/admin/car-item
// @access      Private
const updateCarItem = asyncHandler(async (req, res) => {
  const carItem = await CarItem.findById(req.params.id);
  
  if(!carItem) {
    res.status(400);
    throw new Error('Car not foud!');
  }

  if(req.user.role != 'admin') {
    res.status(400);
    throw new Error('This function available for admin.');
  }

  const updateCarItem 
    = await CarItem
        .findByIdAndUpdate(req.params.id, req.body, {new: true});
        
  res.status(200).json({ message: `Update car item ${req.params.id}` });
})

const deleteCarItem = asyncHandler(async (req, res) => {

  if(req.user.role != 'admin') {
    res.status(400);
    throw new Error('This function available for admin.');
  }

  const carItem = await CarItem.findById(req.params.id);

  await carItem.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  createCarItem, updateCarItem, deleteCarItem
}