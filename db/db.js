const dotenv = require("dotenv");
dotenv.config();

const db = require("knex")({
  client: "pg",
  connection: process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
      },
});

module.exports = db;
