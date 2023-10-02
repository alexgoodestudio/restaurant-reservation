const knex = require("../db/connection");

function listTodayReservations(date) {
    return knex('reservations')
        .select("*")
        .where({ reservation_date : date })
        .orderBy("reservation_time", "asc");
    }    


 function create(newReservation) {
    return knex('reservations')
        .insert(newReservation)
        console.log("create service function 1")
        .returning("*")
        .then((data) => data[0]);
    }


function destroy(reservationId){
    // console.log("Reservation ID to delete: ", reservationId); 
    return knex('reservations').where({reservation_id : reservationId}).del();
}

function read(reservationId){
    // console.log("Reservation ID to read:", reservationId); 
    return knex('reservations').select("*").where({ reservation_id: reservationId}).first();
}

function update(updatedReservation){
    return knex('reservations')
        .select("*")
        .where({reservation_id: updatedReservation.reservation_id})
        //Inside the .where() method, you provide an object that defines the condition(s) for filtering rows. In this case, it's an object with a single key-value pair.reservation_id: This is the name of the column in the database table that you want to use for filtering. updatedReservation.reservation_id: This is the value you want to use as the filter criterion. 
        .update(updatedReservation, "*")
}

module.exports = {
    listTodayReservations,
    create,
    destroy,
    read,
    update,
}