function tuesdayValidation(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;

  if (!Date.parse(reservation_date)) {
    return next({
      message: "reservation_date is not a valid date",
      status: 400,
    });
  }

  const timePattern = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timePattern.test(reservation_time)) {
    return next({
      message: "reservation_time is not a valid time",
      status: 400,
    });
  }

  const [year, month, day] = reservation_date.split('-');
  const [hour, minute] = reservation_time.split(':');

  const reservationDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
  
  res.locals.time = reservationDate;

  console.log(reservationDate.toISOString(), "reservationDATE");
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const numeralDay = reservationDate.getUTCDay();
  
  if (isNaN(numeralDay)) {
    return next({
      message: `reservation_date/ reservation_time is not a number or incorrect`,
      status: 400,
    });
  }
  
  if (numeralDay === 2) {
    return next({
      message: `closed`,
      status: 400,
    });
  }
  
  if (reservationDate < today) {
    return next({
      message: `Reservation must be in the future`,
      status: 400,
    });
  }
  
  next();
}

module.exports = tuesdayValidation;
