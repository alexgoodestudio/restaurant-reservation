function us5_notOccupied(req,res,next){
const {reservation_id} = res.locals.table
if(reservation_id !== "occupied"){
     
     next({
        message: "Table is not occupied",
        status: 400,
    });
}
next()
}

module.exports= us5_notOccupied;