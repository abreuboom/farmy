import express from "express";
import body_parser from "body-parser";
import knex from "knex";
// @ts-ignore
import * as knexConfig from "../knexfile";

require("dotenv").config();

var db: knex<any, unknown[]>;
console.log(knexConfig);

if (process.env.NODE_ENV != "development") {
  console.log(knexConfig);

  db = knex({
    client: "pg",
    connection: process.env.DATABASE_URL
  });
} else {
  db = knex(knexConfig.development);
}

let app = express();

app.use(body_parser.json());

app.get("/", (req, res) => {
  res.send("abc");
});

app.get("/listings", async (req, res) => {
  let data = await db("Listing").select("*");
  res.send(
    await Promise.all(
      data.map(async elem => {
        let produce = await db("Produce")
          .select(["name", "category"])
          .where({ produce_id: elem.produce });
        let lister = await db("User")
          .select("*")
          .where({ id: elem.lister });
        elem.produce = produce;
        elem.lister = lister;
        return elem;
      })
    )
  );
});

app.get("/users", async (req, res) => {
  res.send(await db("User").select("*"));
});

app.get("/requests", async (req, res) => {
  let data = await db("Request").select("*");
  res.send(
    await Promise.all(
      data.map(async elem => {
        let requester = await db("User")
          .select("*")
          .where({ id: elem.requester });
        let produce = await db("Produce")
          .select(["name", "category"])
          .where({ produce_id: elem.produce });

        elem.requester = requester;
        elem.produce = produce;
        return elem;
      })
    )
  );
});

app.listen(9999, () => {
  console.log("Listening on 9999");
});
