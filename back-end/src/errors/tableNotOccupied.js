const service = require("../tables/tables.service")

async function tableNotOccupied(req, res, next){
    const {table_id} = req.params
    const data = await service.read(table_id)

    if(data.status !== "free"){
        next({
            message: "not occupied",
            status: 400,
        });
    }
    next()
}

module.exports= tableNotOccupied;