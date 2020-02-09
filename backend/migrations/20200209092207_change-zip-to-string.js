exports.up = function(knex) {
  return knex.schema.alterTable("Address", table => {
    table.string("zip_code").alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("Address", table => {
    table.integer("zip_code").alter();
  });
};
