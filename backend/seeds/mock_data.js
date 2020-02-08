async function seed(knex) {
  await knex("Listing").truncate();
  await knex("Request").truncate();
  await knex("Produce").truncate();
  await knex("Category").truncate();
  await knex("User").truncate();
  await knex("Address").truncate();

  await knex("Category").insert([
    {
      name: "Fruit"
    },
    {
      name: "Vegetable"
    }
  ]);

  await knex("Produce").insert([
    {
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

  await knex("Address").insert([
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
  await knex("User").insert([
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
  await knex("Listing").insert([
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
  return knex("Request").insert([
    {
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
}
module.exports = {
  seed
};
