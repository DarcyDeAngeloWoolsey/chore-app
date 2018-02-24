//if I want to push to mlab without the heroku dino, I need to put the useual database_url and port needs in place of the strigs and port number
//change from   DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/banking_app',
module.exports = {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:8080",
  DATABASE_URL: process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://DarcyDeAngelo:Bucketlist2@ds139138.mlab.com:39138/banking_app',
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};
