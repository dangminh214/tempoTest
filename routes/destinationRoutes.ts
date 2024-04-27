import express, { Request, Response } from 'express';

const destinationController = require('../controllers/destinationController');

const router = express.Router();

router.get('/', destinationController.getAllDestination);
router.get('/:name', destinationController.getDestinationUsingName);

module.exports = router;