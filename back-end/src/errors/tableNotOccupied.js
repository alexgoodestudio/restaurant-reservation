const service = require("../tables/tables.service")

async function tableNotOccupied(req, res, next){
    const {table_id} = req.params
    console.log(res.locals.table,"ressstableee");

    if(res.locals.table !== undefined){
        const {reservation_id} = res.locals.table;
        console.log(reservation_id,"^^^^^^^^^")
        const data = await service.read(table_id)
    
        if(data.status !== "free" || reservation_id !== "occupied"){
            next({
                message: "not occupied",
                status: 400,
            });
        }
    }
    next()

}

module.exports = tableNotOccupied;