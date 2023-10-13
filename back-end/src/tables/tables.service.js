const knex = require("../db/connection");

function read(id) {
  return knex('tables')
    .select("*")
    .where({ table_id: id })
    .first()
}

function readReservations(id) {
  return knex('reservations')
    .select("*")
    .where({ reservation_id: id })
    .first()
}

function list() {
  return knex('tables')
    .select("*")
    .orderBy('table_name', 'asc')
}

function update(updatedData) {
  return knex('tables')
    .select("*")
    .where({ table_id: updatedData.table_id })
    .update(updatedData)
}

function updateReservationStatus(reservationId, newStatus) {
  return knex('reservations')
    .where({ reservation_id: reservationId })
    .update({ status: newStatus })
    .catch((error) => {
      // console.error(`Error updating reservation status: ${error.message}`);
      throw error;
    });
}

function create(data) {
  return knex('tables')
    .insert(data)
    .returning('*')
    .then((rows) => rows[0]);
}
function destroy(tableId) {
  // console.log(tableId, "qqqqqqqaaaaaaaa")
  return knex('tables')
    .where({ table_id: tableId })
    .del()
}


function finish(table) {
  return knex.transaction(async (transaction) => {
    // Update the status in the 'tables' table to "free"
    await knex('tables')
      .where({ table_id: table.table_id })
      .update({ status: 'free' })
      .transacting(transaction);

    // Update the status in the 'reservations' table to "finished"
    await knex('reservations')
      .where({ reservation_id: table.reservation_id })
      .update({ status: 'finished' })
      .transacting(transaction);
  });
}




module.exports = {
  create,
  list,
  update,
  updateReservationStatus,
  read,
  readReservations,
  finish
};