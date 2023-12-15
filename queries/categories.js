const db = require("../db/dbConfig");
const knex = require("../db/db");

const getCategories = async () => {
  const getAllCategories = await knex.select("id", "name").from("categories");

  return getAllCategories;
};

module.exports = {
  getCategories,
};
