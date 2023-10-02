const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const tuesdayValidation = require("../errors/tuesdayValidation.js");
const pastDate = require("../errors/pastDate")
const peopleDataType = require("../errors/peopleDataType")
const noNulls = require("../errors/noNulls");

const requiredProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

// USER STORY 3 validation for prevention of reservations being scheduled hour before close

//USER STORY TWO |TUESDAY AND ONLY IN FUTURE
//validation for prevention of reservations being scheduled in the past 


async function read(req, res) {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  if (!data) {
    return res.status(404).json({ error: `Reservation id ${reservation_id} not found` });
  }
  res.status(200).json({ data });
}

async function update(req,res){
  const {reservation_id} = req.params;
  const data = await service.read(reservation_id);
  const {status} = req.body.data;
  const updatedData = {...data,status:status};
  res.status(200).json({data:updatedData})  
}

async function list(req, res, next){
  const {date} = req.query;

   res.json({
    data: await service.listTodayReservations(date),
  });
}

async function create(req, res){
  // console.log("Request body:", req.body);  
  const data = await service.create(req.body.data);
  // console.log("Returned data:", data);  
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
    asyncErrorBoundary(hasProperties(...requiredProperties)),
    asyncErrorBoundary(noNulls),
    asyncErrorBoundary(peopleDataType),
    asyncErrorBoundary(pastDate),
    asyncErrorBoundary(tuesdayValidation),
    asyncErrorBoundary(create)
  ],

  delete: asyncErrorBoundary(destroy),
 
  update: asyncErrorBoundary(update),
  
  read:asyncErrorBoundary(read),
};

