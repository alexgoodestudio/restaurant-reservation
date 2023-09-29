exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("mobile_number").notNullable();
    table.date("reservation_date").notNullable();
    table.time("reservation_time").notNullable();
    table.integer("people").unsigned().notNullable();
    table.timestamps(true, true);
    table.string("status").defaultTo("booked");  // Uncommented
    // table.integer("table_id").unsigned();  // Define the column type (if needed)
    // table.foreign("table_id").references("table_id").inTable("tables");  // Set as foreign key (if needed)
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
