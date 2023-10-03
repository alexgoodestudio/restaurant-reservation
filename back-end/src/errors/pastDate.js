function pastDate(req,res,next){

const today = new Date();
const{reservation_date} = req.body.data;
const reservationDate = new Date(reservation_date)

const todayTimeStamp = today.getTime();
const reservationDateTimeStamp =reservationDate.getTime();


    if(todayTimeStamp > reservationDateTimeStamp){
      console.log("compared dates in pastDate validator")
        return res.status(400).send("future")
    }
    next()
}

module.exports = pastDate;

