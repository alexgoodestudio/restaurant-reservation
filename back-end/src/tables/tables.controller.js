const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const length = require("../errors/length");
const tableExists = require("../errors/tableExists");
const capacity = require("../errors/capacity");
const dataExists = require("../errors/dataExists")
const requiredProperties = [
    "table_name",
    "capacity"
];
  
// const environment = process.env.NODE_ENV;

// if (environment === 'development') {
//   console.log("You're in the Development environment");
// } else if (environment === 'production') {
//   console.log("You're in the Production environment");
// } else if (environment === 'test') {
//   console.log("You're in the Test environment");
// } else {
//   console.log("Environment not recognized or NODE_ENV is not set");
// }

async function create(req, res) {
    const data = await service.create(req.body.data)
    res.status(201).json( {data} )
}

async function list(req, res, next) {
    const { table_id } = req.query;
    res.json({
        data: await service.list(table_id),
    });
}

async function read(req, res) {
    const { table_id } = req.params;
    const data = await service.read(table_id);
    res.status(200).json({ data });
}

module.exports = {
    create: [
        asyncErrorBoundary(dataExists),
        asyncErrorBoundary(capacity),
        asyncErrorBoundary(hasProperties([...requiredProperties])), 
        asyncErrorBoundary(length), 
        asyncErrorBoundary(create)
    ],
        
    list: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(list)
    ],
    read: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(read)
    ],
};

