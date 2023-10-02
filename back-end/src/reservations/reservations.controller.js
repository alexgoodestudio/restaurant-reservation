const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
// const tuesdayValidation = require("../errors/tuesdayValidation");
const pastDate = require("../errors/pastDate")
// const validateDateAndTime = require("../errors/validateDateAndTime")

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

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  res.locals.reservation = reservation;
  if (!reservation) {
      next({
          message: `this reservation_id (${reservation_id}) does not exist`,
          status: 404,
      });
  }
  next();
}

function tuesdayValidation(req,res,next){
  const { reservation_date, reservation_time } = req.body.data;
  const reservationDate = new Date(
    `${reservation_date}T${reservation_time}:00Z`
  );
  res.locals.time = reservationDate;
  const today = new Date();
  const numeralDay = reservationDate.getDay()

  if(isNaN(numeralDay)){
    next({
      message:`reservation_date/ reservation_time incorrect`,
      status: 400,
    })
  }

  if(numeralDay === 2){
    next({
      message:`closed`,
      status: 400,
    })
    // return res.status(400).send("we are closed");
  }
  if(reservationDate < today){
    next({
      message:`future`,
      status: 400,
    })
  }
  next();
}

function validateDateAndTime(req, res, next) {
  let hour = res.locals.time.getUTCHours();
  let minutes = res.locals.time.getUTCMinutes();
  if (
    hour < 10 ||
    (hour === 10 && minute < 30) ||
    hour > 21 ||
    (hour === 21 && minute > 30)
  ) {
    next({
      message: "please select a time between 10:30 & 21:30",
      status:400, 
    })
  }

  next();
}

function hasEnoughPeople(req, res, next) {
  let { people } = req.body.data;
  if (typeof people !== "number" || people < 1) {
      next({
          message: "people has to be a number above zero",
          status: 400,
      });
  }
  next();
}

async function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({
    data,
  })
}

async function update(req,res){
  // const {reservation_id} = req.params;
  // const data = await service.read(reservation_id);
  // const {status} = req.body.data;
  // const updatedData = {...data,status:status};
  // res.status(200).json({data:updatedData})  
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

