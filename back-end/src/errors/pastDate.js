function pastDate(req,res,next){

const today = new Date();
const{reservation_date} = req.body.data;
const reservationDate = new Date(reservation_date)

console.log(typeof(today), today," today | reservationDate ", typeof(reservationDate), reservationDate)

const todayTimeStamp = today.getTime();
const reservationDateTimeStamp =reservationDate.getTime();

console.log(todayTimeStamp,"today ts | res ts" , reservationDateTimeStamp)

    if(todayTimeStamp > reservationDateTimeStamp){
      console.log("compared dates in pastDate validator")
        return res.status(400).send("future")
    }
    next()
}

module.exports = pastDate;

