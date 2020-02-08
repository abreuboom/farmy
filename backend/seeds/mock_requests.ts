import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Request")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Request").insert([
        { quantity: 1, units: "count", requester: 1, produce: 1 },
        { quantity: 20, units: "lbs", requester: 2, produce: 3 }
      ]);
    });
}
