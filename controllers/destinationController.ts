import { Request, Response, NextFunction  } from 'express';
const AppError = require('./../utils/appError');
const Destination = require('./../models/destinationModel')

exports.getAllDestination = async (req: Request, res: Response) => {
  let destinations = await Destination.find();

  if (!destinations) {
    return res.status(404).json({
      status: 'fail',
      message: 'Error to get all tours, check the EndPoint'
    });
  }
 
  res.status(200).render('destination/destination', {
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

  res.status(200).render('destination/destinationDetail', {
      status: 'success',
      data: {
        destination
      },
        title: destination.name,
        name: destination.name,
        description: destination.description,
        //destination: destination.destination, 
        imageCover: destination.imageCover    
      }
    );

  console.log("GET a destination using name");
} 