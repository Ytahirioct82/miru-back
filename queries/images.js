const db = require("../db/dbConfig");

const getAllImages = async () => {
  try {
    const allImages = await db.any("SELECT * FROM images");
    return allImages;
  } catch (error) {
    return error;
  }
};

const getActivityImages = async (id) => {
  try {
    const images = await db.any("SELECT * FROM images WHERE activity_id=$1", id);
    return images;
  } catch (error) {
    return error;
  }
};

const getOneActivityImage = async (id) => {
  try {
    const image = await db.any("SELECT * FROM images WHERE activity_id=$1 LIMIT 1", id);
    return image;
  } catch (error) {
    return error;
  }
};

const addImages = async (activityId, images) => {
  const { content, fileName, contentType } = images;
  images.activity_id = activityId;
  try {
    addedImage = await db.any(
      "INSERT INTO images (content,fileName,contentType,activity_id) VALUES ($1,$2,$3,$4) RETURNING *",
      [content, fileName, contentType, images.activity_id]
    );
    return addedImage;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addImages,
  getAllImages,
  getActivityImages,
  getOneActivityImage,
};
