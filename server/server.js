const express = require("express");
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./config");
const { API_BASE_URL } = require("../src/config");

const app = express();

app.use(
  cors({
    "Access-Control-Allow-Origin": CLIENT_ORIGIN,
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

app.get("/api/home/login", (req, res) => {
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

app.listen(8080);

// fetch(localhost:8080/api/login, )
