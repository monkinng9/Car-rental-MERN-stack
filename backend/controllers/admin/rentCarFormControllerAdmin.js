const asyncHandler = require('express-async-handler');
const RentCarForm = require('../../models/end-user/rentCarFormModel');
const CarItem = require('../../models/carItemModel');

// @availabale  Admin
// @desc        Delete Rent Car Form with specific User
// @route       DELETE /api/admin/car-item/rentCarForm/:id
// @access      Private
const deleteCarForm = asyncHandler(async (req, res) => {
  const rentCarform = await RentCarForm.findById(req.params.id);

  if (!rentCarform) {
    res.status(400);
    throw new Error('Form not found!')
  }

  if (req.user.role != 'admin') {
    res.status(400);
    throw new Error('This function available for admin.');
  }

  await rentCarform.remove()
  res.status(200).json({ id: req.params.id })

});

module.exports = {
  deleteCarForm
}