function pastDate(req,res,next){

const today = new Date();
const{reservation_date} = req.body.data;
const reservationDate = new Date(reservation_date)

// console.log(today,"today")
// console.log(reservationDate,"reservationDate");
// console.log(typeof(today),"today")
// console.log(typeof(reservationDate),"reservationDate")
// console.log(today," today | reservationDate ", reservationDate)

const todayTimeStamp = today.getTime();
const reservationDateTimeStamp =reservationDate.getTime();

// console.log(todayTimeStamp,"today ts | res ts" , reservationDateTimeStamp)

    if(todayTimeStamp > reservationDateTimeStamp){
      // console.log("compared dates in pastDate validator")
        return res.status(400).send("future")
        // console.log("done, pastDate")
    }
    next()
}

module.exports = pastDate;

