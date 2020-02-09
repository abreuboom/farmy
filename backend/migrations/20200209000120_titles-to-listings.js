exports.up = function(knex) {
  return knex.schema.alterTable("Listing", table => {
    table.string("title").defaultTo("");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("Listing", table => {
    table.dropColumn("title");
  });
};
