const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { CLIENT_ORIGIN,  JWT_SECRET, PORT, DATABASE_URL } = require("./config");
const { API_BASE_URL } = require("../src/config");
const { ensureToken } = require("./ensureToken.js");
const {User} = require('./models');

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
    return next(); });

app.get("/api/Chores", ensureToken, (req, res) => {
  res.json({
    balanceBook: [
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

app.post("/api/sign-up", jsonParser, (req, res) => {
  const requiredFields = ['userName', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['userName', 'password', 'email'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  const explicityTrimmedFields = ['userName', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }


  const sizedFields = {
    userName: {
      min: 3
    },
    password: {
      min: 8,
      max: 72
    }
  };

  const tooSmallField = Object.keys(sizedFields).find(
  field =>
    'min' in sizedFields[field] && req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {userName, password, email = ''} = req.body;
    email = email.trim();
    console.log(req.body);
  return User.find({userName})
   .count()
   .then(count => {
     if (count > 0) {
       return Promise.reject({
         code: 422,
         reason: 'ValidationError',
         message: 'Username already taken',
         location: 'userName'
       });
     }
     return User.hashPassword(password);
   })
   .then(hash => {
     console.log(userName, email);
     return User.create({
       userName,
       password: hash,
       email
     })
     .then(user => {
       const userObject = user.serialize();
       console.log(userObject);
       return res.status(201).json(userObject);
     })

     .catch(err => {
       console.log(err);
       if (err.reason === 'ValidationError') {
         return res.status(err.code).json(err);
       }
       res.status(500).json({code: 500, message: 'Internal api/sign-up server error'});
     });
   })

});


//this post matches the post in logInActions
app.post("/api/login", jsonParser, (req, res) => {
  // check if user already exists
  // use hash function to match passwords
  // send auth token as a response
  //TODO: auth user
  //add fake user

  // check userName, password with mongoDB storage
  // mongodb client can be used insted of mongoose schema if i want
  const user ={ id: 3 };
  //the user inside the jwt.sign is the data in jwt.verify

  const token = jwt.sign({ user }, JWT_SECRET);
  //instead of returning the user like normal, just returning the token. Token info is passed to the fetch login in logInACtions
  res.json({
      token
  });

});

//ensureToken is verifying that there is a token. See ensureToken.js. If there isn't, it throws an error.
// app.get('/api/protected', ensureToken, (req, res) => {
//
//
// });

let server;

// this function connects to our database, then starts the server
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

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
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

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
