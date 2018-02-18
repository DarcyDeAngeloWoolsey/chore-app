'use strict';
const {router} = require('./authRouter');
const {localStrategy, jwtStrategy} = require('./authStrategy');

module.exports = {router, localStrategy, jwtStrategy};
