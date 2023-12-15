const express = require("express");
const cities = express.Router({ mergeParams: true });
const { getCities } = require("../queries/cities");
const ap = express();

cities.get("/", async (req, res) => {
  const allCities = await getCities();

  res.status(200).json(allCities);
});

module.exports = cities;
