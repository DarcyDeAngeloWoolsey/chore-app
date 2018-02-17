const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { CLIENT_ORIGIN,  JWT_SECRET } = require("./config");
const { API_BASE_URL } = require("../src/config");
const { ensureToken } = require("./ensureToken.js");
const {User} = require('./models');

const app = express();
const jsonParser = bodyParser.json()

app.use(bodyParser.json());

app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  })
);

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

//TODO SET UP MLAB
app.post("/api/sign-up", jsonParser, (req, res) => {
  // create a user in db
  // send it back when created

//first we require these fields
  const requiredFields = ['userName', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

//if fields are missing, through an error
  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  //declare fields are strings, and if their type is not a string, then throw error
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

  //I moved the trimming from front end to the back end because people sometimes what whitespace as their username or password
  //To reject these types, we say which fields must be trimmed, then see if each fields body meets a trim method status. If not, we throw an error
  const explicityTrimmedFields = ['username', 'password'];
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

//Determine field size for the username and the password

  const sizedFields = {
    username: {
      min: 3
    },
    password: {
      min: 8,
      // bcrypt truncates after 72 characters, so let's not give the illusion
      // of security by storing extra (unused) info???
      max: 72
    }
  };

//next we check to see if the fields are too small or too large, then throw an error
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

//this is the username, password, and email we get from the request body of a user input
  let {username, password, email = ''} = req.body;
    // Username and password come in pre-trimmed, otherwise we throw an error
    // before this
    email = email.trim();

  // check if user already exists -> throw an error
  return User.find({username})
   .count()
   .then(count => {
     if (count > 0) {
       // There is an existing user with the same username
       return Promise.reject({
         code: 422,
         reason: 'ValidationError',
         message: 'Username already taken',
         location: 'username'
       });
     }
      // use hash function for password -> authorization Thinkful
     // If there is no existing user, hash the password
     return User.hashPassword(password);
   })
   .then(hash => {
     return User.create({
       username,
       password: hash,
       email
     });
   })
   .then(user => {
     return res.status(201).json(user.serialize());
   })

    //if there is a user, send error
   .catch(err => {
     // Forward validation errors on to the client, otherwise give a 500
     // error because something unexpected has happened
     if (err.reason === 'ValidationError') {
       return res.status(err.code).json(err);
     }
     res.status(500).json({code: 500, message: 'Internal server error'});
   });
});


//this post matches the post in logInActions
app.post("/api/login", jsonParser, (req, res) => {
  // check if user already exists
  // use hash function to match passwords
  // send auth token as a response
  //TODO: auth user
  //add fake user

  // check username, password with mongoDB storage
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

app.listen(8080);
