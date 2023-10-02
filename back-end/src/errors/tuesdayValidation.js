function tuesdayValidation(req,res,next){

    const { reservation_date } = req.body.data;
    // console.log(reservation_date,"rd1");
    const reservationDate = new Date(reservation_date);
    // console.log(reservationDate,"rd2");
    const numeralDay = reservationDate.getDay()
    // console.log(numeralDay,"rd3")

    if(numeralDay === 2){
      return res.status(400).send("we are closed");
    }
    next();
  }

  module.exports = tuesdayValidation;