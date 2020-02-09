exports.up = async function(knex) {
  await knex.schema.alterTable("Produce", table => {
    table.dropForeign("category");
    table
      .foreign("category")
      .references("Category.category_id")
      .onDelete("SET NULL");
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("Produce", table => {
    table.dropForeign("category");
    table.foreign("category_id").references("Category.category_id");
  });
};
