const asyncHandler = require('express-async-handler');

const getCarItems = asyncHandler((req, res) => {
  res.status(200).json({ message: 'Get car item' });
});

const createCarItem = asyncHandler((req, res) => {
  if(!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  res.status(200).json({ message: 'Post car item' });
})

const updateCarItem = asyncHandler((req, res) => {
  res.status(200).json({ message: `Update car item ${req.params.id}` });
})

const deleteCarItem = asyncHandler((req, res) => {
  res.status(200).json({ message: `Delete car item ${req.params.id}` });
})

module.exports = {
  getCarItems, createCarItem, updateCarItem, deleteCarItem
}