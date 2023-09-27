const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validator: dashboard displays one day only/ defaults to current day
function todayOnly(){

}

// async function to display single Reservation for search page
async function findReservation(){

}

async function list(req, res) {
  res.json({
    data: await service.list(),
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};






