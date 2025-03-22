'use strict'


const express = require('express');
const tourController = require('../controllers/tour.controller');

const router = express.Router();

// chaining multiple middleware

router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router.route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;