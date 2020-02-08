async function up(knex) {
  await knex.schema.dropTable("User");
  await knex.schema.createTable("User", table => {
    table.increments("id").primary();
    table.string("username").unique();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table
      .string("email", 255)
      .notNullable()
      .unique();
    table.integer("phone_num", 255).notNullable();
    table.integer("address_id").nullable();
    table.foreign("address_id").references("Address.address_id");
  });
  await knex.schema.dropTable("Request");
  await knex.schema.createTable("Request", table => {
    table.increments("offer_id").primary();
    table.float("quantity").nullable();
    table.string("units").nullable();
    table
      .integer("requester")
      .unsigned()
      .notNullable();
    table.foreign("requester").references("User.id");
    table.integer("produce").notNullable();
    table.foreign("produce").references("Produce.produce_id");
  });
  await knex.schema.dropTable("Listing"),
    await knex.schema.createTable("Listing", table => {
      table.increments("offer_id").primary();
      table.float("quantity").notNullable();
      table.string("units").notNullable();
      table.string("img_link").notNullable();
      table.float("price").notNullable();
      table.integer("lister").notNullable();
      table.foreign("lister").references("User.id");
      table.integer("produce").notNullable();
      table.foreign("produce").references("Produce.produce_id");
    });
  await knex.schema.dropTable("Produce");
  await knex.schema.createTable("Produce", table => {
    table.increments("produce_id").primary();
    table.string("name").unique();
    table.integer("category").notNullable();
    table.foreign("category").references("Category.category_id");
  });
}

async function down(knex) {
  return knex.schema
    .alterTable("User", table => {
      table.dropColumn("address_id");
    })
    .alterTable("Request", table => {
      table.dropColumn("requester");
      table.dropColumn("produce");
    })
    .alterTable("Listing", table => {
      table.dropColumn("lister");
      table.dropColumn("produce");
    })
    .alterTable("Produce", table => {
      table.dropColumn("category");
    });
}

module.exports = {
  up,
  down
}