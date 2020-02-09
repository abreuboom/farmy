exports.up = async function(knex) {
  await knex.schema.alterTable("Produce", table => {
    table.integer("count").defaultTo(0);
  });
  await knex.schema.alterTable("Category", table => {
    table.integer("count").defaultTo(0);
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("Produce", table => {
    table.dropColumn("count");
  });
  await knex.schema.alterTable("Category", table => {
    table.dropColumn("count");
  });
};
