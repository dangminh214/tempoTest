import { Request, Response, NextFunction  } from 'express';
const AppError = require('./../utils/appError');
//const Destination = require('./../models/destinationModel')
import Destination from './../models/destinationModel'

exports.getAllDestination = async (req: Request, res: Response) => {
  let destinations = await Destination.find();

  if (!destinations) {
    return res.status(404).json({
      status: 'fail',
      message: 'Error to get all tours, check the EndPoint'
    });
  }
 
  /* res.status(200).render('destination/destination', {
      title: 'Alle Reiseziele',    
      destinations
    }
  ); */

  res.status(200).json({
      title: 'Alle Reiseziele',    
      destinations
    }
  );
  console.log("GET all destination")
}

exports.getDestinationUsingName = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  const destination = await Destination.findOne({ name: name});   
  //Oder: const tour = await Tour.findOne({ name: req.params.name});   
  if (!destination) {
    return res.status(404).json({
      status: 'fail',
      message: 'No destination found with that name'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      destination
    }
  }); 
  console.log("GET a destination using name");
} 

exports.createDestination = async (req: Request, res: Response) => {
  const newDestination = await Destination.create(req.body);
  if (!newDestination) {
    return res.status(404).json({
      status: 'fail',
      message: 'Fail to create a new Destination'
    });
  }
  res.status(201).json({
    status: 'success',
    destination: newDestination
  });
  console.log("POST a new Destination")
}

/* exports.renderCreateDestination = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render('destination/newDestination', {title: "Neues Reiseziel"});
  console.log("render a new Destination Form");
} 
 */
