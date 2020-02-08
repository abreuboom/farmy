async function seed(knex) {
  // Deletes ALL existing entries
  return knex("Request")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Request").insert([{
          quantity: 1,
          units: "count",
          requester: 1,
          produce: 1
        },
        {
          quantity: 20,
          units: "lbs",
          requester: 2,
          produce: 3
        }
      ]);
    });
}
module.exports = {
  seed
}