const getCarItems = (req, res) => {
  res.status(200).json({ message: 'Get car item' });
}

const createCarItem = (req, res) => {
  res.status(200).json({ message: 'Post car item' });
}

const updateCarItem = (req, res) => {
  res.status(200).json({ message: `Update car item ${req.params.id}` });
}

const deleteCarItem = (req, res) => {
  res.status(200).json({ message: `Delete car item ${req.params.id}` });
}

module.exports = {
  getCarItems, createCarItem, updateCarItem, deleteCarItem
}