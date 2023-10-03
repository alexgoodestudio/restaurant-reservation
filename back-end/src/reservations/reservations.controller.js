const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const pastDate = require("../errors/pastDate")
const hasEnoughPeople = require("../errors/hasEnoughPeople")
const validateDateAndTime = require("../errors/validateDateAndTime")
const tuesdayValidation = require("../errors/tuesdayValidation")
const reservationExists = require("../errors/reservationExists")

// USER STORY 3 validation for prevention of reservations being scheduled hour before close

//USER STORY TWO |TUESDAY AND ONLY IN FUTURE
//validation for prevention of reservations being scheduled in the past 
const requiredProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
];


async function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({
    data,
  })
}

async function update(req,res){
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id);
  const {status} = req.body.data;
  const updatedData = {...data,status:status};
  res.status(200).json({data:updatedData})  
}

async function list(req, res) {
  const mobile_number = req.query.mobile_number;
  const data = await (
      mobile_number
    ? service.search(mobile_number)
    : service.list(req.query.date)
  );
  res.json({
    data,
  });
}

async function create(req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({data});
}

async function destroy(req,res){
  const { reservation_id } = req.params;
  await service.destroy(reservation_id)
  res.status(204).send("deleted");
} 

module.exports = {
  list:  asyncErrorBoundary(list),
  create: 
    [
      asyncErrorBoundary(hasProperties([...requiredProperties])),
      tuesdayValidation,
      hasEnoughPeople,
      pastDate, 
      validateDateAndTime,
      asyncErrorBoundary(create)
    ],
  delete: [asyncErrorBoundary(reservationExists),asyncErrorBoundary(destroy)],
  update:[asyncErrorBoundary(reservationExists),
    tuesdayValidation,
    hasEnoughPeople,
    pastDate, 
    validateDateAndTime,
    asyncErrorBoundary(update)
  ],
  read:[
       asyncErrorBoundary(reservationExists),
       asyncErrorBoundary(read)],
};

