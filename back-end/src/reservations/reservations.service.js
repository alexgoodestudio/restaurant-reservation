const knex = require("../db/connection");
const {today} = require("../utils/date-time")
                                    //from utils
function list(date = today()) {
    return knex('reservations')
        .select("*")
        .where({ reservation_date : date })
        .whereNot("status","finished")
        .orderBy("reservation_time", "asc");
    }    

 function create(newReservation) {
    return knex('reservations')
        .insert(newReservation)
        .returning("*")
        .then((data) => data[0]);
    }

function read(reservationId){
    return knex('reservations')
    .select("*")
    .where({ reservation_id: reservationId})
    .first();
}

function search(mobile_number){
    return knex('reservations')
    .select("*").where({mobile_number: mobile_number})
}

function updateStatus(reservation){
// console.log("you are at the service function updatestatus")
return knex('reservations')
.select("*")
.where({reservation_id : reservation.reservation_id})
.update(reservation,"*")
.then((data) => data[0])
}

module.exports = {
    list,
    create,
    read,
    search,
    updateStatus,
}