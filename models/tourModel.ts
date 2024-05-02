const mongoose = require('mongoose');
const destinationSchema = require('./destinationModel')
const { Schema } = mongoose;

const tourSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'A tour must have a name'],
    unique: true
  },

  /* destination: {
    type: String, 
    required: [true, 'A tour must have at least one destination'],
  },  */ 

  //test relationship
  destinations: [{
    type: mongoose.Schema.ObjectId,
    ref: 'destination',
    required: true
  }],

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
export { tourModel }