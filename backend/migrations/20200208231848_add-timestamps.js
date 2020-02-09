exports.up = async function(knex) {
  await knex.schema.alterTable("User", table => {
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
  await knex.schema.alterTable("Listing", table => {
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
  await knex.schema.alterTable("Request", table => {
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("User", table => {
    table.dropColumn("created_at");
  });
  await knex.schema.alterTable("Listing", table => {
    table.dropColumn("created_at");
  });
  await knex.schema.alterTable("Request", table => {
    table.dropColumn("created_at");
  });
};
