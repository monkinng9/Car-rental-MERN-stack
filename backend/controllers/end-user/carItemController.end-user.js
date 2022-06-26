const asyncHandler = require('express-async-handler');
const CarItem = require('../../models/carItemModel');

// @availabale  End-user
// @desc        Rent Car
// @route       PUT /api/end-user/car-item/:id
// @access      Private
const rentCarItem = asyncHandler(async (req, res) => {
  const carItem = await CarItem.findById(req.params.id);
  
  if(!carItem) {
    res.status(400);
    throw new Error('Car not foud!');
  }

  if(req.user.role != 'end-user') {
    res.status(400);
    throw new Error('This function available for end-user.');
  }

  const updateCarItem 
    = await CarItem
        .findByIdAndUpdate(req.params.id, req.body, {new: true});
      
  
  
  res.status(200).json({ message: `Update car item ${req.params.id}` });
})

module.exports = {
  rentCarItem
}