// // ✕ returns 400 if reservation_id is missing (482 ms)
// const reservationExists = require("./reservationExists")

// function containsReservationId(req,res,next){
//     const {reservation_id} = req.body.data;
//     if(reservation_id === null || reservation_id === "" || typeof reservation_id === "number"){
//         return next({
//             status: 400,
//             message:"reservation_id is required, and must be a number",
//         })
//     }
//     next(reservationExists)
// }

// module.exports = containsReservationId

function hasReservationID(req, res, next) {
    const reservation = req.params.reservation_id || req.body?.data?.reservation_id;

    if(reservation){
        res.locals.reservation_id = reservation;
        next();
    } else {
        next({
            status: 400,
            message: `missing reservation_id`,
        });
    }
  }

  module.exports = hasReservationID;