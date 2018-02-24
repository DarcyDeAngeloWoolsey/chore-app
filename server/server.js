require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { CLIENT_ORIGIN,  JWT_SECRET, PORT, DATABASE_URL } = require("./config");
const { API_BASE_URL } = require("../src/config");
//const { ensureToken } = require("./ensureToken.js");
//const {User, Record, Login} = require('./models');
const { Record } = require('./users/models');
const { router: usersRouter } = require('./users/usersIndex');
//const { router: authRouter } = require('./auth/authIndex');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth/authIndex');

const app = express();
const jsonParser = bodyParser.json()

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if(req.method === 'OPTIONS') {
    return res.sendStatus(204); }
    return next();
  });

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api', usersRouter);
app.use('/api', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

//removed ensureToken as I think jwtAuth with passport will do the job.
// chores is our protected data

//Then find all entries based on user as next step
//in .find() will need a userid: ''
app.get("/api/balanceBook", jwtAuth, (req, res) => {
    Record
        .find()
        .then(records => {
            res.json(records)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            })
        });
});

//testing logInActions

// app.post("/api/login", jsonParser, (req, res) => {
//   let {username, password} = req.body;
//   return Login.create({
//     username, password
//   })
//   .then(login => {
//     const loginObject = login.serialize();
//     return res.status(201).json(loginObject);
//   })
// })



app.post("/api/balanceBook", jsonParser, (req, res) => {
  let {choreDate, choreType, choreBanking, choreTotal, choreAmount} = req.body;
  return Record.create({
    choreDate,
    choreType,
    choreBanking,
    choreAmount,
    choreTotal
  })
  .then(record => {
    const recordObject = record.serialize();
    return res.status(201).json(recordObject);
  })
})


app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

// app.post("/api/login", jsonParser, (req, res) => {
//   const user ={ id: 3 };
//   const token = jwt.sign({ user }, JWT_SECRET);
//   res.json({
//       token
//   });
//
// });

let server;

function runServer(databaseUrl  = DATABASE_URL, port = PORT) {
  console.log(databaseUrl);
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
