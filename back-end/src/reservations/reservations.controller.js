const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validator: dashboard displays one day only/ defaults to current day
  async function todayOnly(req, res, next){
  // let currentDate = new Date();
  // if(currentDate === req.)
  // res.json({data: await service.list})
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
  list: asyncErrorBoundary(list),
};






