// const service = require("../reservations/reservations.service");
function finished(req, res, next){
  const {reservation_id} = res.locals.table
  if(reservation_id === "occupied" ){
       
       next({
          message: "occupied",
          status: 200,
      });
  }
  next()
      }
    

    

module.exports= finished;