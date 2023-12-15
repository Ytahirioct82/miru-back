const express = require("express");
const images = express.Router({ mergeParams: true });

const { addImages, getAllImages, getActivityImages, getOneActivityImage } = require("../queries/images");

images.get("/", async (req, res) => {
  const activityImages = await getActivityImages(req.params.id);
  res.status(200).json(activityImages);
});

images.get("/:id", async (req, res) => {
  const activityImage = await getOneActivityImage(req.params.id);
  res.status(200).json(activityImage);
});

images.post("/", async (request, response) => {
  const addedImages = await addImages(request.body);
  response.status(200).json(addedImages);
});

module.exports = images;
