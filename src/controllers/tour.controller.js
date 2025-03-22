'use strict'


const TourService = require('../services/tour.service');
const Tour = require('./../models/tour.model');


const getAllTours = async (req, res) => {
  try {
    const queryObj = {...req.query};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    console.log(req.query, queryObj);

    const tours = await Tour.find(queryObj).lean();
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: err.message
      }
    })
  }
}

const getTourById = async (req, res) => {
  try {
    //Tour.findOne({_id: req.params.id})
    const tour = await Tour.findById(req.params.id).lean();

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: err.message
      }
    })
  }
}

const createTour = async (req, res) => {
  // const newTours = new TourService({});
  // newTours.save()
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: err.message
      }
    })
  }
}

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: err.message
      }
    })
  }

}

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: err.message
      }
    })
  }
}


module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour
}