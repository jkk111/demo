const express = require("express");
const app = express();
const uuid = require("uuid/v4");

const { json } = require("body-parser");

const items = [];

app.get("/items", (req, res) => res.json(items));

app.post("/items", json(), (req, res) => {
  const item = req.body;
  const id = uuid();
  items.push({
    id,
    content: item.content,
    status: "OPEN"
  });

  res.send("OK");
});

app.patch("/items", json(), (req, res) => {
  const patches = req.body;

  for (const patch of patches) {
    const index = items.findIndex(({ id }) => id === patch.id);

    if (index !== -1) {
      const item = items[index];
      for (const key in item) {
        if (key === "id") {
          continue;
        }
        if (Boolean(patch[key])) {
          item[key] = patch[key];
        }
      }
    }
  }

  res.send("OK");
});

app.listen(8080);
