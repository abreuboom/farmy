export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("Produce")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Produce").insert([{
          name: "Apple",
          category: 1
        },
        {
          name: "Pear",
          category: 1
        },
        {
          name: "Spinach",
          category: 2
        },
        {
          name: "Collard Greens",
          category: 2
        }
      ]);
    });
  await knex("Category")
    .del()
    .then(() => {
      return knex("Category").insert([{
          name: "Fruit"
        },
        {
          name: "Vegetable"
        }
      ]);
    });
}
module.exports = {
  seed
}