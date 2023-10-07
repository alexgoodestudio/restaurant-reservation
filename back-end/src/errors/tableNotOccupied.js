const service = require("../tables/tables.service")

async function tableNotOccupied(req, res, next){
    const {table_id} = req.params
    console.log(res.locals.table,"ressstableee");

    if(res.locals.table !== undefined){
        const reservation_id = res.locals.table.reservation_id;
        console.log(reservation_id,"^^^^^^^^^")
        const data = await service.read(table_id)
    
        if( res.locals.table.status !== "occupied"){
            next({
                message: "not occupied",
                status: 400,
            });
        }
    }
    next()

}

module.exports = tableNotOccupied;