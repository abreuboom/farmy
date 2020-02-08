import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("User")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("User").insert([
        {
          username: "test1",
          first_name: "test",
          last_name: "one",
          email: "111@test.com",
          phone_num: 1111111111,
          address_id: 1
        },
        {
          username: "test2",
          first_name: "test",
          last_name: "two",
          email: "222@test.com",
          phone_num: 2222222222,
          address_id: 2
        },
        {
          username: "test3",
          first_name: "test",
          last_name: "three",
          email: "333@test.com",
          phone_num: 3333333333
        }
      ]);
    });
}
