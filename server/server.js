const express = require('express');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
const {API_BASE_URL} = require('../src/config');

const app = express();

app.use(
    cors({
        "Access-Control-Allow-Origin": CLIENT_ORIGIN,
        "Access-Control-Allow-Credentials": true
    })
);


app.get('/api/Chores', (req, res) => {

    res.json({
      choreList: [{
        choreDate: 'January 21 2018',
        choreType: 'Wash Dishes',
        choreBanking: 'Deposit',
        choreAmount: 5.00,
        choreTotal: 5.00,
      },
      {
        choreDate: 'January 22 2018',
        choreType: 'Take out Trash',
        choreBanking: 'Deposit',
        choreAmount: 3.00,
        choreTotal: 8.00
      }
    ]
    });
});





app.listen(8080);
