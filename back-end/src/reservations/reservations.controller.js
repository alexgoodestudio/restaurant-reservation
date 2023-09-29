const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const notFound = require("../errors/notFound")

const requiredProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];
// validator: dashboard displays one day only/ defaults to current day
async function list(req, res, next){
  // get current date
  // let currentDate = new Date();

  const {date} = req.query;
  console.log("lineeeeeee",date)
  const test  = req.params
  console.log(test, "test")
   res.json({
    data: await service.listTodayReservations(date),
  });
}


function hasRequiredProperties(req, res, next) {
  console.log("hasRequiredPropertiess")
  const { data = {} } = req.body;
  const missingProperties = [];
  const invalidProperties = [];

  requiredProperties.forEach((property) => {
    if (!data[property]) {
      missingProperties.push(`'${property}'`);
    }
  });

  // Additional validation for specific data types
  if (isNaN(Date.parse(data.reservation_date))) {
    invalidProperties.push("'reservation_date' must be a valid date");
  }
  if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.reservation_time)) {
    invalidProperties.push("'reservation_time' must be a valid time");
  }
  if (isNaN(data.people) || typeof data.people !== 'number') {
    invalidProperties.push("'people' must be a valid number");
  }

  if (missingProperties.length || invalidProperties.length) {
    return next({
      status: 400,
      message: [
        ...missingProperties.length ? [`Missing properties: ${missingProperties.join(", ")}`] : [],
        ...invalidProperties,
      ].join("; "),
    });
  }
  next();
}


async function create(req, res){
  console.log("Request body:", req.body);  
  const data = await service.create(req.body.data);
  console.log("Returned data:", data);  
  res.status(201).json({data});
}



async function destroy(req,res){
  const { reservationId } = req.params;
  await service.destroy(reservationId )
  res.sendStatus(204);
} 

module.exports = {
  list:  asyncErrorBoundary(list),
  create: [asyncErrorBoundary(hasRequiredProperties), asyncErrorBoundary(create)],
  delete: asyncErrorBoundary(destroy)
};






