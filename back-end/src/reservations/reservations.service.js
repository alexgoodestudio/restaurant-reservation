const knex = require("../db/connection");
const reservationTable = "reservations";


function listTodayReservations(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date : date })
        .orderBy("reservation_time", "asc");
    }    

async function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
    }

function destroy(reservation_id){
    return knex(reservationTable).where({reservation_id : reservation_id}).del();
}

function read(reservation_id){
    return knex(reservationTable).select("*").where({ reservation_id: reservation_id}).first();
}


function update(updatedReservation){
    return knex(reservationTable)
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