function completed(req, res, next){
    const {reservation_id} = res.locals.table
    if(reservation_id === "occupied" ){
         
         next({
            message: "occupied",
            status: 200,
        });
    }
    next()
        }
      
  
      
  
  module.exports= completed;