const activity = require("../controllers/activityController");
const db = require("../db/dbConfig");
const knex = require("../db/db");

const getAllActivities = async (city, category) => {
  const query = knex.select().from("activity");
  if (city) query.where("city_id", city);
  if (category) query.where("category_id", category);

  return query;
};

const getAllActivitiesWithFavorites = async (city, category, user) => {
  let query = `
    SELECT activity.*, 
           CASE WHEN favorites.id IS NULL THEN FALSE ELSE TRUE END AS is_favorite
    FROM activity
    LEFT JOIN favorites ON activity.id = favorites.activity_id AND favorites.user_id = $1
  `;
  const values = [user.id];

  if (city) {
    query += "WHERE city_id = $2 ";
    values.push(city);
  }
  if (category) {
    query += "AND category_id = $3 ";
    values.push(category);
  }

  query = db.any(query, values);
  return query;
};

const getAllFavActivities = async (id) => {
  try {
    const allFavActivities = await db.any(
      "SELECT * FROM favorites INNER JOIN activity ON activity.id = favorites.activity_id"
    );
    const allFav = allFavActivities.filter((fav) => {
      return fav.user_id === id;
    });

    return allFav;
  } catch (error) {
    throw error;
  }
};

const deleteFavActivities = async (id, users) => {
  try {
    const deleted = await db.one(
      "DElETE FROM favorites WHERE favorites.activity_id=$1 AND favorites.user_id=$2 RETURNING *",
      [id, users]
    );
    return deleted;
  } catch (error) {
    throw error;
  }
};

const getAllUserActivities = async (id) => {
  try {
    const allUserActivities = await db.any("SELECT * FROM activity WHERE user_id=$1", id);
    return allUserActivities;
  } catch (error) {
    throw error;
  }
};

const getOneActivity = async (id) => {
  try {
    const oneActivity = await db.one("SELECT * FROM activity WHERE id=$1", id);
    return oneActivity;
  } catch (error) {
    throw error;
  }
};
const postFavActivity = async (activity) => {
  const { user_id, activity_id } = activity;

  try {
    const newFavActivity = await db.one("INSERT INTO favorites (user_id, activity_id) VALUES ($1, $2) RETURNING *", [
      user_id,
      activity_id,
    ]);

    return newFavActivity;
  } catch (error) {
    throw error;
  }
};

const postActivity = async (user_id, name, description, street_address, city, state, zip_code, category) => {
  try {
    const newActivity = await db.one(
      "INSERT INTO activity (user_id, name, description, street_address, city, state, zip_code, category) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
      [user_id, name, description, street_address, city, state, zip_code, category]
    );
    return newActivity;
  } catch (error) {
    throw error;
  }
};

const editActivity = async (
  activity_id,
  user_id,
  name,
  description,
  street_address,
  city,
  state,
  zip_code,
  category
) => {
  try {
    const edit = await db.one(
      "UPDATE activity SET user_id=$2, name=$3, description=$4, street_address=$5, city=$6, state=$7, zip_code=$8, category=$9 WHERE id=$1 RETURNING *",
      [activity_id, user_id, name, description, street_address, city, state, zip_code, category]
    );
    return edit;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllActivities,
  getAllFavActivities,
  getOneActivity,
  postFavActivity,
  postActivity,
  editActivity,
  getAllUserActivities,
  deleteFavActivities,
  getAllActivitiesWithFavorites,
};
