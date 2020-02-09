exports.up = async function(knex) {
  await knex.schema.alterTable("Request", table => {
    table.string("geotag");
  });
  await knex.schema.alterTable("Listing", table => {
    table.string("geotag");
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("Request", table => {
    table.dropColumn("geotag");
  });
  await knex.schema.alterTable("Listing", table => {
    table.dropColumn("geotag");
  });
};
