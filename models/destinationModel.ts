import mongoose, { Document, Model, Schema } from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'A destination must have a name'],
    unique: true
  },

  tours: {
    type: mongoose.Schema.ObjectId,
    ref: 'tour',
  },

  description: {
    type: String, 
    trim: true
  }, 

  imageCover: {
    type: [String], 
    //required: [true, 'A destination must have a cover image']
  }
});

const destinationModel = mongoose.model('destination', destinationSchema);

export default destinationModel;