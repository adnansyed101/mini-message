const path = require("path");
const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views", "index"), {
    title: "Mini Message Board",
    messages,
  });
});

app.get("/new", (req, res) => {
  res.render(path.join(__dirname, "views", "form"));
});

app.post("/new", (req, res) => {
  const { name, messageText } = req.body;

  messages.push({ text: messageText, user: name, added: new Date() });

  res.redirect("/");
});

app.get("/:name", (req, res) => {
  let userDetailObj = {};
  for (const message of messages) {
    if (message.user === req.params.name) {
      userDetailObj = message;
    }
  }
  res.render(path.join(__dirname, "views", "details"), {
    title: "Details",
    message: userDetailObj,
  });
});

const PORT = 6969;
app.listen(PORT, () => {
  console.log(`Listnening on Port ${PORT}`);
});
