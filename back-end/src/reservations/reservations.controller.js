const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validator: dashboard displays one day only/ defaults to current day
  async function todaysReservations(req, res, next){
  // get current date
  let currentDate = new Date();
  let status = res.json({
    data: await service.listTodayReservations(currentDate),
  });
}


async function createReservation(req, res){
    const data = await service.create(req.body.data);
    res.status(201).json({data});
}

// async function reservationExists to weed out any invalid reservations
async function reservationExists(req, res, next){

}

// async function to display single Reservation for search page
async function findReservation(req, res, next){

}

//async function for the updating that uses update function from service
async function update(req, res, next){

}

async function list(req, res) {
  res.json({
    data: await service.list(),
  });
}

module.exports = {
  list: asyncErrorBoundary(todaysReservations),
  create: asyncErrorBoundary(createReservation),
};






