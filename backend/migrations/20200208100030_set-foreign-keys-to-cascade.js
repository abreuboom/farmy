
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
      .references("User.id")
      .onDelete("CASCADE");
  });

  await knex.schema.alterTable("Request", table => {
    table.dropForeign("requester");
    table
      .foreign("requester")
      .references("User.id")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  await knex.schema.alterTable("User", table => {
    table.dropForeign("address_id");
    table
      .foreign("address_id")
      .references("Address.address_id")
  });
  await knex.schema.alterTable("Listing", table => {
    table.dropForeign("lister");
    table
      .foreign("lister")
      .references("User.id")
  });

  await knex.schema.alterTable("Request", table => {
    table.dropForeign("requester");
    table
      .foreign("requester")
      .references("User.id")
  });

};
