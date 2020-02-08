exports.up = async function(knex) {
  await knex.schema.alterTable("User", table => {
    table.dropColumn("address_id");
    table.integer("address_id").nullable();
    table
      .foreign("address_id")
      .references("Address.address_id")
      .onDelete("CASCADE");
  });
  await knex.schema.alterTable("Listing", table => {
    table.dropColumn("lister");
    table.integer("lister");
    table
      .foreign("lister")
      .references("User.user_id")
      .onDelete("CASCADE");
  });

  await knex.schema.alterTable("Request", table => {
    table.drop("requester");
    table.integer("requester");
    table
      .foreign("requester")
      .references("User.user_id")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {};
