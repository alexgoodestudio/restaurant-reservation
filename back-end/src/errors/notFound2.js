const service = require("../reservations/reservations.service")

async function notFound2(req, res, next) {
  // console.log(req.params.table_id,"notFound req params")
  tableId= req.params.table_id;
  const data = await service.read(tableId)

  if(!data){  
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
  }
next()
}

module.exports = notFound2;