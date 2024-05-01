import { Request, Response, NextFunction  } from 'express';
const AppError = require('./../utils/appError');
const Tour = require('./../models/tourModel')

exports.getOverview = async (req: Request, res: Response) => {   
  let tours = await Tour.find();

  if (!tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'Error to get all tours, check the EndPoint'
    });
  }
    res.status(200).json({
      title: 'Overview',
      tours    
    }
  );
 
  /* res.status(200).render('overview/overview', {
      title: 'Overview',    
    }
  ); */
}