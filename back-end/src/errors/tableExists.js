const service = require("../tables/tables.service");

async function tableExists(req, res, next) {
    // console.log("TABLE EXISTS")
    const { table_id } = req.params;
    const table = await service.read(table_id);
    res.locals.table = table;
    if (!table) {
        next({
            message: `this table_id (${table_id}) does not exist`,
            status: 404,
        });
    }
    next();
  }

  module.exports= tableExists
