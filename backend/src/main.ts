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

app.get("/api/listings", async (req, res) => {
  let data = await db("Listing").select("*");
  res.send(
    await Promise.all(
      data.map(async elem => {
        let produce = (
          await db("Produce")
            .select(["name", "category"])
            .where({ produce_id: elem.produce })
        )[0];
        let lister = (
          await db("User")
            .select(["username"])
            .where({ id: elem.lister })
        )[0];
        elem.produce = produce;
        elem.lister = lister;
        return elem;
      })
    )
  );
});

app.post("/api/listings", async ({ body }, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    let newProdID;
    if (typeof body.produce === "string") {
      let search = await db("Produce")
        .where({ name: body.produce })
        .select("produce_id");
      console.log(search);

      if (search.length) {
        body.produce = search[0].produce_id;
      } else {
        body.produce = (
          await db("Produce").insert(
            {
              name: body.produce
            },
            "produce_id"
          )
        )[0];
      }
    }
    console.log(body);
    let data = (await db("Listing").insert(body, "*"))[0];
    console.log(data);

    await db("Produce")
      .where({ produce_id: data.produce })
      .increment("count", 1);
    res.send(data);
  } catch (E) {
    console.log(E);
    res.status(400);
    res.send(E);
  }
});

app.get("/api/users", async (req, res) => {
  if (req.query.username) {
    res.send(
      (
        await db("User")
          .select("*")
          .where({ username: req.query.username })
      )[0]
    );
  } else {
    res.send(await db("User").select("*"));
  }
});

app.post("/api/users", async ({ body }, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

app.get("/api/requests", async (req, res) => {
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

app.get("/api/produce", async (req, res) => {
  let data = await db("Produce").select("*");
  res.send(data);
});

app.get("/api/categories", async (req, res) => {
  let data = await db("Category").select("*");
  res.send(data);
});

app.listen(process.env.PORT, () => {
  console.log("Listening on " + process.env.PORT);
});
