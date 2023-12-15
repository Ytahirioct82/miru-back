const db = require("../db/dbConfig");
const knex = require("../db/db");

const getCities = async () => {
  const getAllCities = await knex.select("id", "name").from("cities");

  return getAllCities;
};

module.exports = {
  getCities,
};
