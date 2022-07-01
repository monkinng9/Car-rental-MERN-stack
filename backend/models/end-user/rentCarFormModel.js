const mongoose = require('mongoose');

const rentCarFormSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  carItemID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CarItem'
  },
  carID: {
    type: String,
    required: [true, 'Please add a Car ID'],
  },
  carType: {
    type: String,
    require: [true, 'Please add a type of car']
  },
  status: {
    type: String,
    required: [true, 'Please add a Status value'],
    // Rented, Returned
  },
  rentTime: {
    type: Date,
    default: Date.now(),
    required: [true, 'Please add a rent time'],
  },
  dueTime: {
    type: Date,
    required: [true, 'Please add a due time'],
  },
  returnTime: {
    type: Date,
  }
});

module.exports = mongoose.model('RentCarForm', rentCarFormSchema);