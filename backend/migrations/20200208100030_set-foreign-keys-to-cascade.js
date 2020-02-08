exports.up = async function(knex) {
  await knex.schema.alterTable("User", table => {
    table
      .foreign("address_id")
      .references("Address.address_id")
      .alter()
      .onDelete("CASCADE");
  });
  await knex.schema.alterTable("Listing", table => {
    table
      .foreign("lister")
      .references("User.user_id")
      .alter()

      .onDelete("CASCADE");
  });

  await knex.schema.alterTable("Request", table => {
    table
      .foreign("requester")
      .references("User.user_id")
      .alter()
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {};
