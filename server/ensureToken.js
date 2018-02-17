//this function just makes sure that there is a jwt token in the header. This token comes from the jwt get request in the server
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("./config");

module.exports = {
  ensureToken: function ensureToken(req, res, next){
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, JWT_SECRET, function(err, data){
            if (err) {
                res.sendStatus(403);
            }   else {
                next();
            }
        })

    } else {
        res.sendStatus(403);
    }
}
}
