function us5_notOccupied(req,res,next){
const {reservation_id} = res.locals.table
console.log(reservation_id,"UUUUUUUU")
if(!reservation_id){
    
    
     next({
        message: "Table is not occupied",
        status: 400,
    });
}
next()
}

module.exports= us5_notOccupied;