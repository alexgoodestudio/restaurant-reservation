function tuesdayValidation(req,res,next){
    const { reservation_date, reservation_time } = req.body.data;
    const reservationDate = new Date(
      `${reservation_date}T${reservation_time}:00Z`
    );
    res.locals.time = reservationDate;
    const today = new Date();
    const numeralDay = reservationDate.getDay()

    if(isNaN(numeralDay)){
      next({
        message:`reservation_date/ reservation_time is not a number or incorrect`,
        status: 400,
      })
    }

    if(numeralDay === 2){
      next({
        message:`closed`,
        status: 400,
      })
      // return res.status(400).send("we are closed");
    }
    if(reservationDate < today){
      next({
        message:`future`,
        status: 400,
      })
    }
    next();
  }

  module.exports = tuesdayValidation;