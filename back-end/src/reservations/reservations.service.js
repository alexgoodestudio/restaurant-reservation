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

function destroy(reservationId){
    return knex('reservations').where({reservation_id : reservationId}).del();
}

function read(reservationId){
    return knex('reservations').select("*").where({ reservation_id: reservationId}).first();
}

function search(mobile_number){
    return knex('reservations')
}

// function update(updatedReservation){
//     return knex('reservations')
//         .select("*")
//         .where({reservation_id: updatedReservation.reservation_id})
//         .update(updatedReservation, "*")
// }

module.exports = {
    list,
    create,
    destroy,
    read,
    search,
    // update,
}