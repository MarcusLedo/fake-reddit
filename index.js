"use strict";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module"; // <--- create require manually

// I need to declare require manually because of "type:module"
const require = createRequire(import.meta.url);
const redditData = require("./data/redditData.json"); //Already parsing the JSON data
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public"))); // <--- Mapping the file

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];

  if (data) res.render("subreddit", { ...data });
  else res.render("noPageFound");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("*", (req, res) => {
  res.render("noPageFound");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
