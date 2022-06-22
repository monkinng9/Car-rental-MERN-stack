const mongoose = require('mongoose');

const carItemSchema = mongoose.Schema({
  carID: {
    type: String,
    require: [true, 'Please add a ID car'],
  },
  carType: {
    type: String,
    require: [true, 'Please add a type of car']
  },
  carAvailable: {
    type: Boolean,
    require: [true, 'Please add a status of car']
  },
  carAdd: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('CarItem', carItemSchema);