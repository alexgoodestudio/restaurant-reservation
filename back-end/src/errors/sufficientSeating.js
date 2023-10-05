const service = require("../tables/tables.service")

async function sufficientSeating(req,res,next){
    const {table_id} = req.params
    const table = await service.read(table_id)
    const reservation= res.locals.reservation
    // console.log(typeof table.capacity,"I am a damn table")
    // console.log(typeof reservation.people,"I am a damn reservation")
    if(reservation.people > table.capacity){
        console.log("capacity if statement");
        next({
            message: "reservation is higher than capacity",
            status: 400,
        });
    }
    next()
}

module.exports= sufficientSeating;