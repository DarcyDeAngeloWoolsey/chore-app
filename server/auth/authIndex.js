'use strict';

const {localStrategy, jwtStrategy} = require('./authStrategy');
const {router} = require('./authRouter');

module.exports = {localStrategy, jwtStrategy, router};
