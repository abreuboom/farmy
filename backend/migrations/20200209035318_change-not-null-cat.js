exports.up = function(knex) {
  return knex.schema.alterTable("Produce", table => {
    table.integer("category").alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("Produce", table => {
    table
      .integer("category")
      .notNullable()
      .alter();
  });
};
