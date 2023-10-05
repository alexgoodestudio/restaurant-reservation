const service = require("../tables/tables.service")

async function us5occupied(req,res,next){
const {reservation_id} = res.locals.table
if(!reservation_id){
    next({
        message: "not occupied",
        status: 400,
    });
}
next()
}

// async function us5occupied(req, res, next){
//     console.log("TABLE OCCUPIED");
//     const {table_id} = req.params
//     console.log(table_id,"*************  table_id");
//     const data = await service.read(table_id)
//     console.log(data.reservation_id," ************* data.reservat")
//     console.log(res.locals.table,"res table");
//     if(!data.reservation_id){
//         // console.log("tableOccupied If Statement!!!!!!!!!!")
//         next({
//             message: "not occupied",
//             status: 400,
//         });
//     }
//     next()
// }

module.exports= us5occupied;