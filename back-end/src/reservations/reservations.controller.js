const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const requiredProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

//async function for the updating that uses update function from service

function validDate(data, res) {
  const reservationDate = new Date(data.reservation_date);
  if (reservationDate.getDay() === 2) {
    res.status(400).send("Reservations are not allowed on Tuesdays");
  }
}

async function update(req,res,next){
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
  const resData = await service.create(req.body.data);
  res.status(201).json({data:resData});
}

async function destroy(req,res){
  const { reservationId } = req.params;
  await service.destroy(reservationId )
  res.status(204);
} 

module.exports = {
  list:  asyncErrorBoundary(list),
  create: [validDate, hasProperties(requiredProperties ), asyncErrorBoundary(create)],
  delete: asyncErrorBoundary(destroy),
  update:asyncErrorBoundary(update),
};






