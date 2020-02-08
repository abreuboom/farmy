exports.up = async function(knex) {
  await knex.schema.alterTable("User", table => {
    table.dropForeign("address_id");
    table
      .foreign("address_id")
      .references("Address.address_id")
      .onDelete("CASCADE");
  });
  await knex.schema.alterTable("Listing", table => {
    table.dropForeign("lister");
    table
      .foreign("lister")
      .references("User.user_id")
      .onDelete("CASCADE");
  });

  await knex.schema.alterTable("Request", table => {
    table.dropForeign("lister");
    table.drop("requester");
    table.integer("requester");
    table
      .foreign("requester")
      .references("User.user_id")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {};
