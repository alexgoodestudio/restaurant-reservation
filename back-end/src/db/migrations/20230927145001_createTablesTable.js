
exports.up = function(knex) {
    return knex.schema.createTable("tables", (table) => {
        table.increments("table_id").primary();
        table.string("first_name").notNullable();
      });
};

exports.down = function(knex) {
  
};
