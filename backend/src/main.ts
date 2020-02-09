import express from "express";
import body_parser from "body-parser";
import knex from "knex";
// @ts-ignore
import * as knexConfig from "../knexfile";

require("dotenv").config();

var db = knex<any, unknown[]>(knexConfig[process.env.NODE_ENV]);

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
          .select(["username"])
          .where({ id: elem.lister });
        elem.produce = produce;
        elem.lister = lister;
        return elem;
      })
    )
  );
});

app.post("/listings", async ({ body }, res) => {
  try {
    let data = (await db("Listing").insert(body, "*"))[0];
    await db("Produce")
      .where({ produce_id: body.produce_id })
      .increment("count", 1);
    res.send(data);
  } catch (E) {
    res.send(E);
  }
});

app.get("/users", async (req, res) => {
  res.send(await db("User").select("*"));
});

app.post("/users", async ({ body }, res) => {
  let { address, ...rest } = body;

  let addr_id: number | undefined = undefined;
  try {
    if (typeof address == "object") {
      addr_id = (await db("Address").insert(address, "address_id"))[0];
    }
    res.send(
      (await db("User").insert({ ...rest, address_id: addr_id }, "*"))[0]
    );
  } catch (e) {
    console.log(e);

    res.status(400);
    res.send(e);
  }
});

app.get("/requests", async (req, res) => {
  let data = await db("Request").select("*");
  res.send(
    await Promise.all(
      data.map(async elem => {
        let requester = await db("User")
          .select("username")
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

app.get("/produce", async (req, res) => {
  let data = await db("Produce").select("*");
  res.send(data);
});

app.get("/categories", async (req, res) => {
  let data = await db("Category").select("*");
  res.send(data);
});

app.listen(process.env.PORT, () => {
  console.log("Listening on " + process.env.PORT);
});
