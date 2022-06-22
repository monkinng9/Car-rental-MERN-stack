const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get car item' });
}); 

router.post('/', (req, res) => {
  res.status(200).json({ message: 'Post car item' });
}); 

router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Update car item ${req.params.id}` });
}); 

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete car item ${req.params.id}` });
}); 

module.exports = router;