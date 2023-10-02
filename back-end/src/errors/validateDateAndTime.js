function validateDateAndTime(req, res, next) {
  const { reservation_date} = req.body.data;
  // Validate reservation_date
  console.log(reservation_date)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(reservation_date) || isNaN(new Date(reservation_date).getTime())) {
    console.log("dateeeeeeeeeeeeeee")
    console.log(new Date(reservation_date).getTime(),"!@#$%^&*()!@#$%^&*()")
    return res.status(400).send("A valid 'reservation_date' property is required.");
  }

  // Validate reservation_time
  // const timePattern = /^\d{2}:\d{2}$/;
  // if (!timePattern.test(reservation_time)) {
  //   console.log("timmmmmeeeeee")
  //   return res.status(400).send("A valid 'reservation_time' property is required.");
  // }
console.log("vdatcl")
  next();
}

module.exports = validateDateAndTime;
