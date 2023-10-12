function validateDateAndTime(req, res, next) {
  let hour = res.locals.time.getUTCHours();
  let minute = res.locals.time.getUTCMinutes();
  console.log("RESLOCALS",res.locals);
  console.log("HOUR AND MINUTE BEFORE",hour,minute);
  
  console.table({
    "(hour < 10)":(hour < 10),
    "(hour === 10 && minute < 30)":(hour === 10 && minute < 30),
    "(hour > 21)":(hour > 21),
    "(hour === 21 && minute > 30)":(hour === 21 && minute > 30),
    "(hour < 10) ||(hour === 10 && minute < 30) ||(hour > 21) ||(hour === 21 && minute > 30)":(hour < 10) ||(hour === 10 && minute < 30) ||(hour > 21) ||(hour === 21 && minute > 30),
  })
  if (
    (hour < 10) ||
    (hour === 10 && minute < 30) ||
    (hour > 21) ||
    (hour === 21 && minute > 30)
  ) {
    return next({
      message: "please select a time between 10:30 & 21:30",
      status: 400,
    });
  }
  console.log("HOUR AND MINUTE AFTER@@@@",hour,minute);
  next();
}

module.exports = validateDateAndTime;
