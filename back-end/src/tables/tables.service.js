const knex = require("../db/connection");

function read(id) {
  return knex('tables')
    .select("*")
    .where({table_id: id})
    .first()
}

function list(){
    return knex('tables')
    .select("*")
    .orderBy('table_name','asc')
}
function update(updatedData){
  return knex('tables')
  .select("*")
  .where({table_id : updatedData.table_id})
  .update(updatedData)
}

function create(data) {
  return knex('tables')
    .insert(data)
    .returning('*')
    .then((rows) => rows[0]);
}
function destroy(reservation_id){
return knex('reservations')
  .where({reservation_id : reservation_id})
  .del()
}


module.exports = {
  create,
  list,
  update,
  read,
  destroy,
};