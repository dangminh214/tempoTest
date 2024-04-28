import { Request, Response, NextFunction  } from 'express';
const AppError = require('./../utils/appError');
const Tour = require('./../models/tourModel')
//Destination = require('./../models/destinationModel')
import Destination from '../models/destinationModel';

exports.getAllTours = async (req: Request, res: Response) => {
  let tours = await Tour.find();

  if (!tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'Error to get all tours, check the EndPoint'
    });
  }
 
  res.status(200).render('tours/tours', {
      title: 'Alle Reisen',    
      tours
    }
  );
}

exports.createTour = async (req: Request, res: Response) => {
  const newTour = await Tour.create(req.body);
  if (!newTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Fail to create a new tour'
    });
  }
  res.status(201).json({
    status: 'success',
    tour: newTour
  });
  console.log("POST a new tour")
}

exports.renderNewTourForm = async (req: Request, res: Response) => {
  const destination = await Destination.find()
  res.status(201).render("tours/newTour", {destination, title: "Neue Reise"});
}

exports.getTour = async (req: Request, res: Response, next: NextFunction) => {
  const tour = await Tour.findById(req.params.id);
  
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });

  console.log("GET a tour using mongodbid")
};

exports.getTourUsingDestination = async (req: Request, res: Response, next: NextFunction) => {
  const { destination } = req.params;
  const tour = await Tour.findOne({ destination: destination});

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that destination'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });

  console.log("GET a tour using destination");
}

exports.getTourUsingName = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  const tour = await Tour.findOne({ name: name});   
  //Oder: const tour = await Tour.findOne({ name: req.params.name});   

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that name'
    });
  }

  res.status(200).render('tours/tourDetail', {
      status: 'success',
      data: {
        tour
      },
        title: tour.name,
        name: tour.name,
        description: tour.description,
        destination: tour.destination, 
        imageCover: `${tour.name}.jpg`    
      }
    );

  console.log("GET a tour using name");
}

exports.updateTourByName = async (req: Request, res: Response, next: NextFunction) => {
  const tour = await Tour.findOneAndUpdate({name: req.params.name}, req.body, {
    new: true,
    runValidators: true
  });

  if (!tour) {
    return next(new AppError('No tour found with that name', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });

  console.log("PATCH Update a tour")
};

exports.deleteTour = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params.id)
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: "delete successful"
  });

  console.log("Delete a tour using mongodbID successful")
}

exports.addTour = async (req: Request, res: Response) => {
  const newTour = await Tour.create(req.body);
  if (!newTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Fail to create a new tour'
    });
  }
  res.status(201).json({
    status: 'success',
    tour: newTour
  });
  console.log("POST a new tour")
}
