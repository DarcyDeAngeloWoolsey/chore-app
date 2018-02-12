const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./config");
const { API_BASE_URL } = require("../src/config");

const app = express();
const jsonParser = bodyParser.json()

app.use(bodyParser.json());

app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  })
);

app.get("/api/Chores", (req, res) => {
  res.json({
    choreList: [
      {
        choreDate: "January 21 2018",
        choreType: "Wash Dishes",
        choreBanking: "Deposit",
        choreAmount: 5.0,
        choreTotal: 5.0
      },
      {
        choreDate: "January 22 2018",
        choreType: "Take out Trash",
        choreBanking: "Deposit",
        choreAmount: 3.0,
        choreTotal: 8.0
      }
    ]
  });
});

app.get("/api/sign-up", (req, res) => {
  res.json({
    users: [
      {
        userName: "Serina",
        email: "girly@gmail.com",
        password: 555,
        loggedIn: true
      },
      {
        userName: "Darcy",
        email: "girly@gmail.com",
        password: 555,
        loggedIn: true
      }
    ]
  });
});

//TODO SET UP MLAB
app.post("/api/sign-up", jsonParser, (req, res) => {
  // create a user in db
  // send it back when created

  // check if user already exists -> throw an error
  // use hash function for password -> authorization Thinkful
  console.log("app post users is running")
  console.log(req.body);
  res.json(req.body);
});

app.post("/api/login", jsonParser, (req, res) => {
  // check if user already exists
  // use hash function to match passwords
  // send auth token as a response
  console.log("app post is running")
  console.log(req.body);
  res.json(req.body);
});

app.listen(8080);

// fetch(localhost:8080/api/login, )
