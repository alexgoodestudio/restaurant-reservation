// ✕ returns 400 if reservation_id is missing (482 ms)


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