const express = require('express');
const tourController = require('../controllers/tour.controller');

const router = express.Router();

router.param('id', tourController.checkId);

// chaining multiple middleware
router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router.route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;