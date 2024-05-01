const mongoose = require('mongoose');
const destinationSchema = require('./destinationModel')
const { Schema } = mongoose;

const tourSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'A tour must have a name'],
    unique: true
  },

  destination: {
    type: String, 
    required: [true, 'A tour must have at least one destination'],
  },  

  //testDestinaiton:  [destinationSchema],
  /* destination: {
    type: Schema.Types.ObjectId,
    ref: 'Destination',
    required: [true, 'A tour must have at least one destination']
  }, */

  description: {
    type: String, 
    trim: true
  }, 

  imageCover: {
    type: String, 
    //required: [true, 'A tour must have a cover image']
  }
});

const tourModel = new mongoose.model('tour', tourSchema);
module.exports = tourModel;