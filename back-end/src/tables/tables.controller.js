const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const noNulls = require("../errors/noNulls");
const hasProperties = require("../errors/hasProperties");

const requiredProperties = [
  "table_name",
  "table_id",
  "capacity"
];

async function create(req, res) {
  console.log("Request body:", req.body);  
  const data = await service.create(req.body.data);
  console.log("Returned data:", data);  
  res.status(201).json({data});
}

async function list(req, res, next){
    const {table_id} = req.query;
  
     res.json({
      data: await service.list(table_id),
    });
  }

async function read(req, res) {
  const { table_id } = req.params;
  const data = await service.read(table_id);
  res.status(200).json({data});
}

module.exports = {
  create: [asyncErrorBoundary(noNulls), asyncErrorBoundary(hasProperties(...requiredProperties)), asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list), 
  read: asyncErrorBoundary(read), 
};