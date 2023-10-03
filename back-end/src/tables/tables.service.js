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
  console.log(data,"SERVICE")
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