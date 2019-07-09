"use strict";

const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const stream = fs.createWriteStream("log.txt", { flags: "a" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("We're here, logging stuff."));

// Test with: curl -d "message=test" -X POST http://localhost:3000/
app.post("/", (req, res) => {
  if (req.body.message) {
    const now = new Date();
    stream.write(
      `${now.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })}: ${req.body.message}\n\n`
    );
    return res.send({ status: "success", message: req.body.message });
  } else {
    return res.send({ status: "error", error: "No message was sent." });
  }
});

app.listen(port, () =>
  console.log(`Logging server listening on port ${port}!`)
);
