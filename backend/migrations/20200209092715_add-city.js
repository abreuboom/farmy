exports.up = function(knex) {
  return knex.schema.alterTable("Address", table => {
    table
      .string("city")
      .notNullable()
      .defaultTo("");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("Address", table => {
    table.dropColumn("city");
  });
};
