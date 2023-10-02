const knex = require("../db/connection");

function read(id) {
  return knex('tables')
    .where({table_id: id})
    .first();
}

function list(table_id){
    return knex('tables')
    .select("*")
    .where({ table_id: table_id });
}

function create(data) {
  return knex('tables')
    .insert(data);
}

module.exports = {
  create,
  list,
  read,
};