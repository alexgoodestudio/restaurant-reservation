function validateDateAndTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;

  console.log(reservation_date)


  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(reservation_date) || isNaN(new Date(reservation_date).getTime())) {
    console.log("dateeeeeeeeeeeeeee")
    console.log(new Date(reservation_date).getTime(), "!@#$%^&*()!@#$%^&*()")
    return res.status(400).send("A valid 'reservation_date' property is required.");
  }

  const timePattern = /^\d{2}:\d{2}$/;
  if (!timePattern.test(reservation_time)) {
    console.log("timmmmmeeeeee")
    return res.status(400).send("A valid 'reservation_time' property is required.");
  }
  console.log("vdatcl")

  let hour = res.locals.time.getUTCHours();
  let minutes = res.locals.time.getUTCMinutes();
  if (
    hour < 10 ||
    (hour === 10 && minute < 30) ||
    hour > 21 ||
    (hour === 21 && minute > 30)
  ) {
    next({
      message: "please select a time between 10:30 & 21:30",
      status:400, 
    })
  }

  next();
}

module.exports = validateDateAndTime;
