const mongoose = require('mongoose');
const destinationSchema = require('./destinationModel')

const tourSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'A tour must have a name'],
    unique: true
  },

  destination: {
    type: String, 
    required: [true, 'A tour must have atleast one destination'],
  }, 

  //testDestinaiton:  [destinationSchema],

  description: {
    type: String, 
    trim: true
  }, 

  imageCover: {
    type: String, 
    required: [true, 'A tour must have a cover image']
  }
});

const tourModel = new mongoose.model('tour', tourSchema);
module.exports = tourModel;