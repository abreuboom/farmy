exports.up = async function(knex) {
  await knex.schema.alterTable("Request", table => {
    table.dropForeign("produce");
    table
      .foreign("produce")
      .references("Produce.produce_id")
      .onDelete("SET NULL");
  });
  await knex.schema.alterTable("Listing", table => {
    table.dropForeign("produce");
    table
      .foreign("produce")
      .references("Produce.produce_id")
      .onDelete("SET NULL");
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("Request", table => {
    table.dropForeign("produce");
    table.foreign("produce").references("Produce.produce_id");
  });
  await knex.schema.alterTable("Listing", table => {
    table.dropForeign("produce");
    table.foreign("produce").references("Produce.produce_id");
  });
};
