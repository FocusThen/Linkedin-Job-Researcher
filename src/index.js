const express = require("express");

const app = express();
const scrape = require("./scrape");

async function jobs() {
  const data = await scrape.getData();
  console.log(data);
}

jobs();

app.get("/", async (req, res) => {
  const data = await scrape.getData();
  res.json(data);
});

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000`);
});
