import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Address")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Address").insert([
        {
          line_one: "1 1st Street",
          line_two: "apt 1",
          zip_code: "11111",
          state: "AA"
        },
        {
          line_one: "2 2nd Street",
          line_two: "apt 2",
          zip_code: "22222",
          state: "BB"
        }
      ]);
    });
}
