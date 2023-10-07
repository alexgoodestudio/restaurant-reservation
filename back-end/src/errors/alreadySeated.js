const service = require("../tables/tables.service");

async function alreadySeated(req, res, next) {
    const  reservation_id  = res.locals.reservation_id;
    console.log(reservation_id,"RES_ID")
    const reservation = await service.readReservations(reservation_id);
    if (reservation.status === 'seated') {
        return next({
            status: 400,
            message: 'seated',
        });
    }
    next();
}


module.exports = alreadySeated