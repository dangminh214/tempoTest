import express from 'express';
const tourController = require('../controllers/tourController');

const router = express.Router();

//Each Tour has a separated name
//Overview
router
  .route('/')
  .get(tourController.getAllTours)

//Create a new tour - doesnt work yet
router
  .route('/newTour')
  .get(tourController.renderNewTourForm)
  .post(tourController.createTour)

//ALl tours
router
  .route('/tours')
  .get(tourController.getAllTours)

//2 Ways to find a tour
//Find By name - for user
router
  .route('/:name')
  .get(tourController.getTourUsingName)

//Find by ID - to test
router
  .route('/findTourByID/:id')
  .get(tourController.getTour)
//Update A tour by name
router
  .route('/updateTourByName/:name')
  .patch(tourController.updateTourByName)

//Delete a Tour using its ID => Should I convert it to delete using name? 
router
  .route('/deleteATour/:id')
  .delete(tourController.deleteTour)

//Find using destination
router.route('/findTourByDestination/:destination')
  .get(tourController.getTourUsingDestination);

module.exports = router;
