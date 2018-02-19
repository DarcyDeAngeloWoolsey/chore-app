const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const RecordSchema = mongoose.Schema({
  choreDate: {
    type: Date,
    required: true
  },
  choreType: {
    type: String,
    required: true
  },
  choreBanking: {
    type: String,
    required: true
  },
  choreAmount: {
    type: Number,
    required: true
  },
  choreTotal: {
    type: Number,
    required: true
  }
});

RecordSchema.methods.serialize = function() {
  return {
    choreDate: this.choreDate || '',
    choreType: this.choreType || '',
    choreBanking: this.choreBanking || '',
    choreAmount: this.choreAmount || '',
    choreTotal: this.choreTotal || ''
  };
};

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  }
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    email: this.email|| ''
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const Record = mongoose.model('Record', RecordSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {User, Record};
