async function seed(knex) {
  await knex("Listing").del();
  await knex("Request").del();
  await knex("Produce").del();
  await knex("Category").del();
  await knex("User").del();
  await knex("Address").del();

  await knex("Category").insert([
    {
      name: "Fruit"
    },
    {
      name: "Vegetable"
    }
  ]);

  let { category_id: catFruit_id } = (
    await knex("Category")
      .select("category_id")
      .where({ name: "Fruit" })
  )[0];

  let { category_id: catVeg_id } = (
    await knex("Category")
      .select("category_id")
      .where({ name: "Vegetable" })
  )[0];
  await knex("Produce").insert([
    {
      name: "Apple",
      category: catFruit_id
    },
    {
      name: "Pear",
      category: catFruit_id
    },
    {
      name: "Spinach",
      category: catVeg_id
    },
    {
      name: "Collard Greens",
      category: catVeg_id
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

  let { address_id: addr1 } = (
    await knex("Address")
      .select("address_id")
      .where({ state: "AA" })
  )[0];
  let { address_id: addr2 } = (
    await knex("Address")
      .select("address_id")
      .where({ state: "BB" })
  )[0];
  await knex("User").insert([
    {
      username: "test1",
      first_name: "test",
      last_name: "one",
      email: "111@test.com",
      phone_num: 1111111111,
      address_id: addr1
    },
    {
      username: "test2",
      first_name: "test",
      last_name: "two",
      email: "222@test.com",
      phone_num: 2222222222,
      address_id: addr2
    },
    {
      username: "test3",
      first_name: "test",
      last_name: "three",
      email: "333@test.com",
      phone_num: 3333333333
    }
  ]);
  let prod1 = (
    await knex("Produce")
      .select("produce_id")
      .where({ name: "Apple" })
  )[0].produce_id;
  let prod2 = (
    await knex("Produce")
      .select("produce_id")
      .where({ name: "Spinach" })
  )[0].produce_id;
  let user1 = (
    await knex("User")
      .select("id")
      .where({ username: "test1" })
  )[0].id;
  let user2 = (
    await knex("User")
      .select("id")
      .where({ username: "test2" })
  )[0].id;
  await knex("Listing").insert([
    {
      quantity: 1,
      units: "count",
      img_link: "#",
      price: 1,
      lister: user1,
      produce: prod1,
      title: "test title 1"
    },
    {
      quantity: 1,
      units: "count",
      img_link: "#",
      price: 1,
      lister: user1,
      produce: prod2,
      title: "test title 2"
    },
    {
      quantity: 10,
      units: "lbs",
      img_link: "#",
      price: 12,
      lister: user2,
      produce: prod2,
      title: "Test title 3"
    }
  ]);

  let prod3 = (
    await knex("Produce")
      .select("produce_id")
      .where({ name: "Pear" })
  )[0].produce_id;
  return knex("Request").insert([
    {
      quantity: 1,
      units: "count",
      requester: user1,
      produce: prod1
    },
    {
      quantity: 20,
      units: "lbs",
      requester: user2,
      produce: prod3
    }
  ]);
}
module.exports = {
  seed
};
