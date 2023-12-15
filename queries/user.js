const db = require("../db/dbConfig");

const postNewUser = async (userInfo) => {
  const { name, email, password } = userInfo;
  try {
    const newUser = await db.one("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [
      name,
      email,
      password,
    ]);

    return newUser;
  } catch (error) {
    const err = new Error("user with email already exist");
    err.status = 400;
    throw err;
  }
};

module.exports = {
  postNewUser,
};
