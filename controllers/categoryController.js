const express = require("express");
const categories = express.Router({ mergeParams: true });
const { getCategories } = require("../queries/categories");
const ap = express();

categories.get("/", async (req, res) => {
  const allCategories = await getCategories();

  res.status(200).json(allCategories);
});

module.exports = categories;
