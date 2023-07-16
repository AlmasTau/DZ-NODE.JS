const express = require("express");
const fs = require("fs");
const querystring = require("querystring");

const app = express();
const port = 3000;

const users = [];
fs.writeFileSync("./users.json", JSON.stringify(users), "utf-8");
console.log("users.json created with an empty array");

app.get("/", (req, res) => {
  const data = fs.readFileSync("./index.html", "utf-8");
  res.status(200).send(data);
});

app.get("/register", (req, res) => {
  const data = fs.readFileSync("./register.html", "utf-8");
  res.status(200).send(data);
});

app.post("/users", (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  }).on("end", () => {
    const userData = querystring.parse(Buffer.concat(body).toString());
    const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
    users.push(userData);
    fs.writeFileSync("./users.json", JSON.stringify(users), "utf-8");
    const redirectUrl = "/users?name=" + userData.name;
    res.redirect(302, redirectUrl);
  });
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name) {
    let data = fs.readFileSync("./users.html", "utf-8");
    data = data.replace("%name%", name);
    res.status(200).send(data);
  } else {
    res.status(403).send("name is not specified");
  }
});

app.get("/feedback", (req, res) => {
  const data = fs.readFileSync("./feedback.html", "utf-8");
  res.status(200).send(data);
});

app.get("/favicon.ico", (req, res) => {
  const data = fs.readFileSync("./favicon.ico");
  res.status(200).contentType("image/x-icon").send(data);
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
