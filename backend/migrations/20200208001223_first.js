async function up(knex) {
  return knex.schema
    .createTable("User", table => {
      table.increments("id").primary();
      table.string("username").unique();
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
      table
        .string("email", 255)
        .notNullable()
        .unique();
      table.integer("phone_num", 255).notNullable();
    })
    .createTable("Address", table => {
      table.increments("address_id").primary();
      table.string("line_one").notNullable();
      table.string("line_two").notNullable();
      table.integer("zip_code", 5).notNullable();
      table.string("state", 2).notNullable();
    })
    .createTable("Request", table => {
      table.increments("offer_id").primary();
      table.float("quantity").nullable();
      table.string("units").nullable();
    })
    .createTable("Listing", table => {
      table.increments("offer_id").primary();
      table.float("quantity").notNullable();
      table.string("units").notNullable();
      table.string("img_link").notNullable();
      table.float("price").notNullable();
    })
    .createTable("Produce", table => {
      table.increments("produce_id").primary();
      table.string("name").unique();
    })
    .createTable("Category", table => {
      table.increments("category_id").primary();
      table.string("name").unique();
    });
}
async function down(knex) {
  return knex.schema
    .dropTable("User")
    .dropTable("Address")
    .dropTable("Request")
    .dropTable("Listing")
    .dropTable("Produce")
    .dropTable("Category");
}
module.exports = {
  up,
  down
}