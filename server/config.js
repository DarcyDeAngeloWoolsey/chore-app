module.exports = {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:8080",
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/banking_app',
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET || "secret"
};
