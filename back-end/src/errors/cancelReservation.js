function cancelReservation(req, res, next) {
  // const reservationId = req.body
  const reservation = res.locals.reservation
  console.log(reservation,"?????!!!!!!")
  if (reservation === "cancelled") {
    console.log("cancelReservation Function If Statemnet")
    return next({
      status: 200,
      message: `cancelled reservation status shows ${status}`
    })
  }
  next()
}

module.exports = cancelReservation;
