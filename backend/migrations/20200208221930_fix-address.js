exports.up = function(knex) {
  return knex.schema.alterTable("Address", table => {
    table.string("line_two").alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("Address", table => {
    table
      .string("line_two")
      .notNullable()
      .alter();
  });
};
