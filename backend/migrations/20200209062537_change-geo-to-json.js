exports.up = function(knex) {
  return knex.schema.alterTable("Listing", table => {
    table.json("geotag").alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("Listing", table => {
    table.string("geotag").alter();
  });
};
