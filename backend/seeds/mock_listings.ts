import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Listing")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Listing").insert([
        {
          quantity: 1,
          units: "count",
          img_link: "#",
          price: 1,
          lister: 1,
          produce: 1
        },
        {
          quantity: 1,
          units: "count",
          img_link: "#",
          price: 1,
          lister: 1,
          produce: 2
        },
        {
          quantity: 10,
          units: "lbs",
          img_link: "#",
          price: 12,
          lister: 2,
          produce: 2
        }
      ]);
    });
}
