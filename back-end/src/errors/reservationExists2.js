const service = require("../reservations/reservations.service");

async function reservationExists2(req, res, next) {
    const reservationId = req.params.reservation_id
    console.log("$$$$$$$$$$$$$", reservationId)
    const reservation = await service.read(reservationId);
    // console.log(reservation,"THIS IS RESERVATION FROM RESERVATIONEXISTS2 FUNCTION")
    if(!reservation){
        // console.log("inside of reservationExist IF STATEMENT")
        next({
            message: `this reservation_id (${reservationId}) does not exist`,
            status: 404,
        });
    }else{
        res.locals.reservation = reservation;
        next();
    }
  }

  module.exports = reservationExists2;