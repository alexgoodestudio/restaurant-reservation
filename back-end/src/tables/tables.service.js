const knex = require("../db/connection");

function read(id) {
  return knex('tables')
    .where({table_id: id})
    .first()
}

function list(){
    return knex('tables')
    .select("*")
    .orderBy('table_name','asc')
}

function create(data) {
  return knex('tables')
    .insert(data)
    .returning('*')
    .then((rows) => rows[0]);
}


module.exports = {
  create,
  list,
  read,
};