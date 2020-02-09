exports.up = function(knex) {
  return knex.schema.alterTable("User", table => {
    table.bigInteger("phone_num").alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("User", table => {
    table.integer("phone_num").alter();
  });
};
