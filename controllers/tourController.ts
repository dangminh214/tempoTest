import { Request, Response, NextFunction  } from 'express';
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
import {tourModel} from '../models/tourModel';
import {destinationModel} from '../models/destinationModel';


exports.getAllTours = catchAsync(async (req: Request, res: Response) => {
  let tours = await tourModel.find();

  if (!tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'Error to get all tours, check the EndPoint'
    });
  }

    res.status(200).json({
      status: 'success',
      title: 'Alle Reisen',    
      tours
    }
  );
})

exports.createTour = catchAsync(async (req: Request, res: Response) => {
  const newTour = await tourModel.create(req.body);
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
})

exports.getTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tour = await tourModel.findById(req.params.id);
  
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
});

exports.getTourUsingDestination = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const  destinationName:string = req.params.destination;
  const destination = await destinationModel.findOne({ name: destinationName}); 
  const destinationId = destination?._id.toString();
  console.log("destinationId",destinationId)
  console.log("await tourModel.find():", await tourModel.find());
  
  if (!destination) {
    return res.status(404).json({
      status: 'fail',
      message: 'Destination not found'
    });
  }
  //const tours = await tourModel.find({ destinations: destinationId}); //{ $in: [destinationId] }
  const tours = await tourModel
    .find({ destinations: { $in: [destinationId] } })
    .populate('destinations');
  console.log("found tours:", tours)

  if (!tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that destination'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  });

  console.log("GET a tour using destination");
})

exports.getTourUsingName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  const tour = await tourModel.findOne({ name: name});      

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that name'
    });
  }
  res.status(200).json({
    status: 'success',
      data: {
        tour
      },
    }
  );

  console.log("GET a tour using name");
})

exports.updateTourByName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tour = await tourModel.findOneAndUpdate({name: req.params.name}, req.body, {
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
});

exports.deleteTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params.id)
  const tour = await tourModel.findByIdAndDelete(req.params.id);

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
})

exports.addTour = catchAsync(async (req: Request, res: Response) => {
  const newTour = await tourModel.create(req.body);
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
})
