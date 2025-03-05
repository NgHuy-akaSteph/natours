const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`, 'utf-8')
);


const checkId = (req, res, next, val) => {
  if(val * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
}

const checkBody = (req, res, next) => {
  if(!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
}

const getAllTours = (req, res) => {

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
}

const getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), () => {
    res
      .status(201)
      .json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
  });
}

const updateTour = (req, res) => {

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
}

const deleteTour = (req, res) => {

  res.status(204).json({
    status: 'success',
    data: null
  });
}


module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody
}